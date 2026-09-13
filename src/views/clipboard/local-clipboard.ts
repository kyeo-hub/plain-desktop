import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import {
  peerClipboardGroups,
  dropPeerClipboard,
  gotoPeerClipboardPage,
} from '@/lib/peer/local-clipboard-data'

export type { PeerClipboardGroup } from '@/lib/peer/local-clipboard-data'

/** UI binding over the resident local-peer data layer: group totals and
 *  clear-all policies live here, data lives in lib/peer. */
export function useLocalClipboard() {
  const groups = peerClipboardGroups
  const total = computed(() => groups.value.reduce((n, g) => n + g.total, 0))

  function clearGroup(peerId: string) {
    const group = groups.value.find((g) => g.peerId === peerId)
    if (group) dropPeerClipboard(peerId, group.items.map((it) => it.id))
  }

  function clearAll() {
    for (const g of groups.value) {
      if (g.online) clearGroup(g.peerId)
    }
  }

  return {
    groups, total,
    clearGroup, clearAll,
  }
}

export function useLocalClipboardActions() {
  const { pageSize } = storeToRefs(useMainStore())
  return {
    limit: pageSize,
    deleteItem: dropPeerClipboard,
    fetchPage: gotoPeerClipboardPage,
  }
}
