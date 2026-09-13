<template>
  <peer-group-shell
    :name="group.name"
    :device-type="group.deviceType"
    :online="group.online"
    :count="group.items.length"
    :clearable="group.online && group.items.length > 0"
    @clear="$emit('clear')"
  >
    <div
      v-if="group.loaded && group.online && !group.permissions.includes('NOTIFICATION_LISTENER')"
      class="warn-banner"
    >
      <i-material-symbols:warning-outline />
      <span>{{ $t('notification_listener_permission_denied') }}</span>
      <button @click.stop="$emit('open-settings')">{{ $t('open_access_settings') }}</button>
    </div>
    <slot></slot>
  </peer-group-shell>
</template>

<script setup lang="ts">
import PeerGroupShell from '@/components/PeerGroupShell.vue'
import type { PeerNotificationGroup } from '@/lib/peer/local-peer-data'

defineProps<{
  group: PeerNotificationGroup
}>()

defineEmits<{
  clear: []
  'open-settings': []
}>()
</script>

<style lang="scss" scoped>
.warn-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--pl-shape-m);
  background-color: color-mix(in srgb, var(--md-sys-color-warning) 16%, transparent);
  color: var(--md-sys-color-warning);
  font-size: 0.75rem;

  button {
    margin-inline-start: auto;
    flex-shrink: 0;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
