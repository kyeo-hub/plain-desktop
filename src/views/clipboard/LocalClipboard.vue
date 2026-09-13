<template>
  <div class="quick-content-main">
    <div class="top-app-bar">
      <button v-tooltip="$t('close')" class="btn-icon" @click.prevent="store.quick = ''">
        <i-material-symbols:arrow-back-rounded />
      </button>
      <div class="title">
        {{ $t('header_actions.clipboard') }}
        <span v-if="total" class="count-pill">{{ total }}</span>
      </div>
      <div class="actions">
        <button v-if="total" v-tooltip="$t('clear_list')" class="btn-icon" @click.prevent="clearAll">
          <i-material-symbols:delete-forever-outline-rounded />
        </button>
      </div>
    </div>

    <div class="quick-content-body">
      <clipboard-group
        v-for="g in groups"
        :key="g.peerId"
        :group="g"
        @clear="clearGroup(g.peerId)"
      />
      <NoDataPlaceholder v-if="!groups.length" :loading="groups.some((g) => g.loading)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NoDataPlaceholder from '@/components/NoDataPlaceholder.vue'
import ClipboardGroup from './ClipboardGroup.vue'
import { useMainStore } from '@/stores/main'
import { useLocalClipboard } from './local-clipboard'

const store = useMainStore()

const { groups, total, clearGroup, clearAll } = useLocalClipboard()
</script>

<style lang="scss" scoped>
.quick-content-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .peer-group:first-child {
    margin-top: 16px;
  }
}
</style>
