<template>
  <v-modal v-if="open" width="420px" @close="close" @cancel="close">
    <template #headline>
      {{ $t('screen_capture.ui.shortcutSettings') }}
    </template>
    <template #content>
      <div class="capture-shortcut-body">
        <div class="capture-shortcut-current">
          <span class="capture-shortcut-label">{{ $t('screen_capture.ui.shortcutCurrent') }}</span>
          <code class="capture-shortcut-value" data-testid="capture-shortcut-current">{{ displayAccelerator }}</code>
        </div>
        <button
          type="button"
          class="capture-shortcut-recorder"
          :class="{ recording }"
          data-testid="capture-shortcut-recorder"
          @click="startRecording"
        >
          <template v-if="recording">{{ $t('screen_capture.ui.shortcutRecording') }}</template>
          <template v-else-if="draft">{{ displayAccelerator }}</template>
          <template v-else>{{ $t('screen_capture.ui.shortcutRecordHint') }}</template>
        </button>
        <p v-if="recordError" class="capture-shortcut-error" data-testid="capture-shortcut-error">{{ recordError }}</p>
        <p class="capture-shortcut-hint">{{ $t('screen_capture.ui.shortcutConflictHint') }}</p>
      </div>
    </template>
    <template #actions>
      <v-text-button data-testid="capture-shortcut-reset" :disabled="saving" @click="resetToDefault">
        {{ $t('screen_capture.ui.shortcutReset') }}
      </v-text-button>
      <v-filled-button data-testid="capture-shortcut-save" :disabled="saving || !draft" @click="save">
        {{ $t('screen_capture.ui.shortcutSave') }}
      </v-filled-button>
    </template>
  </v-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CaptureShortcutStatus } from '@/lib/screen-capture/capture-shortcut'
import { setCaptureShortcut } from '@/lib/screen-capture/capture-shortcut'
import { acceleratorFromKeyboardEvent, formatAccelerator } from '@/lib/screen-capture/shortcut-recorder'
import { isMacPlatform } from '@/lib/platform'

interface Props {
  open: boolean
  status: CaptureShortcutStatus | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'saved', status: CaptureShortcutStatus): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()
const recording = ref(false)
const draft = ref('')
const saving = ref(false)
const recordError = ref('')

const isMac = isMacPlatform()
const displayAccelerator = computed(() => {
  const raw = draft.value || props.status?.accelerator || ''
  return raw ? formatAccelerator(raw, isMac) : raw
})

watch(
  () => props.open,
  (open) => {
    if (open) {
      recording.value = false
      draft.value = props.status?.accelerator ?? ''
      recordError.value = ''
    } else {
      recording.value = false
      window.removeEventListener('keydown', onRecorderKeydown, true)
    }
  },
)
watch(recording, (active) => {
  if (active) {
    window.addEventListener('keydown', onRecorderKeydown, true)
  } else {
    window.removeEventListener('keydown', onRecorderKeydown, true)
  }
})
onUnmounted(() => window.removeEventListener('keydown', onRecorderKeydown, true))

function startRecording() {
  recordError.value = ''
  recording.value = true
}

function onRecorderKeydown(event: KeyboardEvent) {
  if (!recording.value) {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  if (event.key === 'Escape') {
    recording.value = false
    return
  }
  const accelerator = acceleratorFromKeyboardEvent(event)
  if (!accelerator) {
    recordError.value = t('screen_capture.ui.shortcutInvalidKey')
    return
  }
  draft.value = accelerator
  recordError.value = ''
  recording.value = false
}

async function save() {
  if (!draft.value) return
  saving.value = true
  try {
    const status = await setCaptureShortcut(draft.value)
    if (status.registered) {
      emit('saved', status)
      close()
    } else {
      recordError.value = status.error ?? t('screen_capture.ui.shortcutSaveFailed')
    }
  } catch {
    recordError.value = t('screen_capture.ui.shortcutSaveFailed')
  } finally {
    saving.value = false
  }
}

async function resetToDefault() {
  saving.value = true
  try {
    const status = await setCaptureShortcut(null)
    emit('saved', status)
    close()
  } catch {
    recordError.value = t('screen_capture.ui.shortcutSaveFailed')
  } finally {
    saving.value = false
  }
}

function close() {
  recording.value = false
  emit('update:open', false)
}
</script>

<style lang="scss" scoped>
.capture-shortcut-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.capture-shortcut-current {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.capture-shortcut-label {
  color: var(--md-sys-color-on-surface-variant);
  font-size: 0.875rem;
}

.capture-shortcut-value {
  font-size: 0.875rem;
  padding: 4px 8px;
  border-radius: 8px;
  background: var(--md-sys-color-surface-variant);
  color: var(--md-sys-color-on-surface-variant);
}

.capture-shortcut-recorder {
  border: 1px solid var(--md-sys-color-outline);
  border-radius: 8px;
  background: none;
  color: var(--md-sys-color-on-surface);
  min-height: 40px;
  padding: 4px 12px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;

  &:hover {
    background: var(--md-sys-color-surface-variant);
  }

  &.recording {
    border-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-primary);
  }
}

.capture-shortcut-error {
  margin: 0;
  color: var(--md-sys-color-error);
  font-size: 0.875rem;
}

.capture-shortcut-hint {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: 0.75rem;
}
</style>
