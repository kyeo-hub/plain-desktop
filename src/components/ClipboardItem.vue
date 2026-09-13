<template>
  <article class="item clipboard-item">
    <div class="clip-main">
      <div class="row1">
        <span class="name">{{ item.label || item.source }}</span>
        <time v-tooltip="formatDateTimeFull(item.createdAt)" class="nowrap">{{ formatTimeAgo(createdAt) }}</time>
        <button v-tooltip="$t('copy')" class="btn-icon del" @click.stop="$emit('copy', item)">
          <i-material-symbols:content-copy-outline-rounded />
        </button>
        <button v-tooltip="$t('delete')" class="btn-icon del" @click.stop="$emit('delete', item)">
          <i-material-symbols:close-rounded />
        </button>
      </div>
      <div class="clip-text" :class="{ sensitive: item.sensitive }">{{ item.text }}</div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDateTimeFull, formatTimeAgo } from '@/lib/format'
import type { IClipboard } from '@/lib/interfaces'

const props = defineProps<{ item: IClipboard }>()

defineEmits<{
  copy: [item: IClipboard]
  delete: [item: IClipboard]
}>()

const createdAt = computed(() => {
  const v = props.item.createdAt
  return /^\d+$/.test(v ?? '') ? new Date(Number(v)).toISOString() : v
})
</script>

<style lang="scss" scoped>
.item.clipboard-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: var(--pl-shape-m);
  background: var(--md-sys-color-surface-container-low);
  word-break: break-all;

  &:hover {
    background: var(--md-sys-color-surface-container-high);
  }

  .clip-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .row1 {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .name {
    flex: 0 1 auto;
    min-width: 0;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--md-sys-color-on-surface);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  time {
    font-size: 0.75rem;
    color: var(--md-sys-color-on-surface-variant);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .del {
    width: 28px;
    height: 28px;
    flex: 0 0 28px;
    opacity: 0;
    pointer-events: none;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &:hover .del {
    opacity: 1;
    pointer-events: auto;
  }

  .clip-text {
    font-size: 0.8rem;
    color: var(--md-sys-color-on-surface-variant);
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &.sensitive {
      -webkit-line-clamp: 1;
      filter: blur(4px);
    }
  }

  @media (hover: none) {
    .del {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
