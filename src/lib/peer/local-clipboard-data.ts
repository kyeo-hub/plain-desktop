import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import emitter from '@/plugins/eventbus'
import type { IClipboard } from '@/lib/interfaces'
import { DeviceType } from '@/lib/status'
import { clipboardFragment } from '@/lib/api/fragments'
import { cancelClipboardGQL } from '@/lib/api/mutation'
import { gqlFetchPeer } from '@/lib/api/peer-client'
import { findLoginPeer, loginPeers } from '@/lib/device/login-peers'
import { isLocalMode } from '@/lib/device/local-mode'
import { useMainStore } from '@/stores/main'

const CLIPBOARD_EVENT_TYPE = 39

const PEER_CLIPBOARD_GQL = `
  query clipboard($offset: Int!, $limit: Int!, $query: String!) {
    clipboard(offset: $offset, limit: $limit, query: $query) {
      ...ClipboardFragment
    }
    clipboardCount(query: $query)
  }
  ${clipboardFragment}
`

export interface PeerClipboardGroup {
  peerId: string
  name: string
  deviceType: DeviceType
  /** Reflects the last data fetch only — never WS lifecycle, so it never flaps. */
  online: boolean
  /** True only until the first fetch settles; background refreshes never show it. */
  loading: boolean
  loaded: boolean
  /** Phone-side master switch inferred from the list fetch: true = served,
   *  false = peer answered clipboard_sync_disabled, null = not attempted yet. */
  clipboardSync: boolean | null
  page: number
  total: number
  items: IClipboard[]
}

/** Resident aggregation state — lives for the whole app session in local mode,
 *  independent of any panel. */
export const peerClipboardGroups = ref<PeerClipboardGroup[]>([])

let started = false

function groupOf(peerId: string): PeerClipboardGroup | undefined {
  return peerClipboardGroups.value.find((g) => g.peerId === peerId)
}

function limit() {
  return useMainStore().pageSize
}

async function fetchPeerClipboard(peerId: string, silent = false) {
  const peer = findLoginPeer(peerId)
  const group = groupOf(peerId)
  if (!peer || !group) return
  if (group.clipboardSync === false) return
  if (!silent && !group.loaded) group.loading = true
  try {
    const res = await gqlFetchPeer<{ clipboard: IClipboard[]; clipboardCount: number }>(
      peer,
      PEER_CLIPBOARD_GQL,
      { offset: (group.page - 1) * limit(), limit: limit(), query: '' },
    )
    if (res.errors?.length) {
      if (res.errors[0].message === 'clipboard_sync_disabled') group.clipboardSync = false
    } else {
      group.clipboardSync = true
      group.items = res.data?.clipboard ?? []
      group.total = res.data?.clipboardCount ?? 0
    }
    group.online = true
  } catch {
    group.online = false
  } finally {
    group.loaded = true
    group.loading = false
  }
}

function syncGroups() {
  const alive = new Set(loginPeers.value.map((p) => p.id))
  for (const g of [...peerClipboardGroups.value]) {
    if (!alive.has(g.peerId)) {
      peerClipboardGroups.value = peerClipboardGroups.value.filter((it) => it.peerId !== g.peerId)
    }
  }
  for (const p of loginPeers.value) {
    const group = groupOf(p.id)
    if (group) {
      group.name = p.name
      group.deviceType = p.deviceType
      continue
    }
    peerClipboardGroups.value.push({
      peerId: p.id, name: p.name, deviceType: p.deviceType,
      online: true, loading: true, loaded: false, clipboardSync: null, page: 1, total: 0, items: [],
    })
    fetchPeerClipboard(p.id)
  }
}

/** Event 39 means the phone is broadcasting clipboard changes, so a previously
 *  disabled peer gets its probe re-armed here. */
export function handlePeerClipboardEvent(peerId: string, type: number) {
  if (type !== CLIPBOARD_EVENT_TYPE) return
  const group = groupOf(peerId)
  if (!group || !findLoginPeer(peerId)) return
  if (group.clipboardSync === false) group.clipboardSync = null
  fetchPeerClipboard(peerId, true)
}

/** Idempotent bootstrap — call once from the app root in local mode. */
export function startLocalClipboardData() {
  if (started || !__IS_TAURI__ || !isLocalMode()) return
  started = true

  emitter.on('peer_ws_event', ({ peerId, type }) => handlePeerClipboardEvent(peerId, type))

  syncGroups()
  watch(loginPeers, syncGroups)
}

export function gotoPeerClipboardPage(peerId: string, page: number) {
  const group = groupOf(peerId)
  if (!group) return
  group.page = page
  fetchPeerClipboard(peerId)
}

/** Optimistically drops clipboard entries locally and cancels them on the peer. */
export function dropPeerClipboard(peerId: string, ids: string[]) {
  const group = groupOf(peerId)
  if (!group || !ids.length) return
  const idSet = new Set(ids)
  group.items = group.items.filter((it) => !idSet.has(it.id))
  group.total = Math.max(0, group.total - ids.length)
  const peer = findLoginPeer(peerId)
  if (peer) void gqlFetchPeer(peer, cancelClipboardGQL, { ids }).catch(() => {})
}
