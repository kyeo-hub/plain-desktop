<template>
  <peer-group-shell
    :name="group.name"
    :device-type="group.deviceType"
    :online="group.online"
    :count="group.total"
    :clearable="group.online && group.items.length > 0"
    @clear="$emit('clear')"
  >
    <div v-if="group.items.length" class="grp-items">
      <clipboard-item
        v-for="item in group.items"
        :key="item.id"
        :item="item"
        @delete="deleteItem(group.peerId, [$event.id])"
      />
    </div>
    <div v-else class="g-empty">{{ $t(emptyKey) }}</div>
    <v-pagination
      v-if="group.total > limit"
      :page="group.page"
      :go="(p: number) => fetchPage(group.peerId, p)"
      :total="group.total"
      :limit="limit"
    />
  </peer-group-shell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PeerGroupShell from '@/components/PeerGroupShell.vue'
import ClipboardItem from '@/components/ClipboardItem.vue'
import type { PeerClipboardGroup } from '@/lib/peer/local-clipboard-data'
import { useLocalClipboardActions } from './local-clipboard'

const props = defineProps<{
  group: PeerClipboardGroup
}>()

defineEmits<{
  clear: []
}>()

const { limit, deleteItem, fetchPage } = useLocalClipboardActions()

const emptyKey = computed(() => {
  if (props.group.loading) return 'loading'
  if (props.group.clipboardSync === false) return 'clipboard_sync_disabled'
  return props.group.online ? 'no_data' : 'offline'
})
</script>

<style lang="scss" scoped>
.grp-items {
  display: contents;
}

.g-empty {
  padding: 12px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--md-sys-color-on-surface-variant);
}
</style>
