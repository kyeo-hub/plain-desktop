<template>
  <div class="ntf-group" :class="{ offline: !group.online }">
    <div class="group-head" @click="collapsed = !collapsed">
      <DeviceTypeIcon :device-type="group.deviceType" />
      <span class="g-name nowrap">{{ group.name }}</span>
      <span class="dot" :class="group.online ? 'on' : 'off'"></span>
      <span class="g-status">{{ $t(group.online ? 'online' : 'offline') }}</span>
      <span class="g-count">{{ group.items.length }}</span>
      <button
        v-if="group.online && group.items.length"
        v-tooltip="$t('clear_list')"
        class="btn-icon"
        @click.stop="$emit('clear')"
      >
        <i-material-symbols:delete-forever-outline-rounded />
      </button>
      <span class="chev" :class="{ closed: collapsed }">
        <i-material-symbols:keyboard-arrow-down-rounded />
      </span>
    </div>
    <div v-if="!collapsed" class="grp-body">
      <div
        v-if="group.loaded && group.online && !group.permissions.includes('NOTIFICATION_LISTENER')"
        class="warn-banner"
      >
        <i-material-symbols:warning-outline />
        <span>{{ $t('notification_listener_permission_denied') }}</span>
        <button @click.stop="$emit('open-settings')">{{ $t('open_access_settings') }}</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DeviceTypeIcon from '@/components/DeviceTypeIcon.vue'
import type { PeerNotificationGroup } from '@/lib/peer/local-peer-data'

defineProps<{
  group: PeerNotificationGroup
}>()

defineEmits<{
  clear: []
  'open-settings': []
}>()

const collapsed = ref(false)
</script>

<style lang="scss" scoped>
.ntf-group {
  border-radius: var(--pl-shape-l);
  background-color: var(--md-sys-color-surface-container);
  overflow: hidden;
  margin: 0 16px;

  &.offline {
    .g-status,
    .grp-body {
      opacity: 0.56;
    }
  }
}

.group-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  user-select: none;
  min-height: 48px;
  box-sizing: border-box;

  .g-name {
    font-weight: 600;
  }

  .g-status {
    font-size: 0.72rem;
    color: var(--md-sys-color-on-surface-variant);
  }

  .g-count {
    margin-inline-start: auto;
    font-size: 0.72rem;
    color: var(--md-sys-color-on-surface-variant);
    background-color: var(--md-sys-color-surface-container-high);
    border-radius: 999px;
    padding: 2px 8px;
  }

  .btn-icon {
    width: 32px;
    height: 32px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .chev {
    display: flex;
    color: var(--md-sys-color-on-surface-variant);
    transition: transform 0.2s ease;

    &.closed {
      transform: rotate(-90deg);
    }
  }
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  &.on {
    background-color: var(--md-sys-color-primary);
  }

  &.off {
    background-color: var(--md-sys-color-outline-variant);
  }
}

.grp-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}

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
