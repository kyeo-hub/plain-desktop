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
    <div class="warn-row">
      <i-material-symbols:warning-outline />
      <span>{{ $t('notification_listener_permission_denied') }}</span>
    </div>
    <v-text-button class="open-settings" @click.stop="$emit('open-settings')">{{ $t('open_access_settings') }}</v-text-button>
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
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  padding: 8px 12px;
  border-radius: var(--pl-shape-m);
  background-color: color-mix(in srgb, var(--md-sys-color-warning) 16%, transparent);
  color: var(--md-sys-color-warning);
  font-size: 0.75rem;

  .warn-row {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
  }

  // element prefix outranks VTextButton's own scoped sizing
  button.open-settings {
    height: 28px;
    padding: 2px 8px;
    font-size: 0.75rem;
  }
}
</style>
