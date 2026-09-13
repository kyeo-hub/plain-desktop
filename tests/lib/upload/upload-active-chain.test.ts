import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { computed, defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { useTempStore } from '@/stores/temp'
import { useUploadList } from '@/views/uploads/upload-list'
import { hasActiveUploadBatches, resetUploadBatchesForTests } from '@/lib/upload/batch-progress'

const Harness = defineComponent({
  setup() {
    const list = useUploadList()
    const hasActiveUploads = computed(() => hasActiveUploadBatches())
    return { list, hasActiveUploads }
  },
  render() { return h('div') },
})

describe('upload active chain via useUploadList watch', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    resetUploadBatchesForTests()
  })

  it('registers items added by array replacement and tracks active state', async () => {
    const wrapper = mount(Harness, {
      global: {
        // useUploadList calls useI18n() in setup — the harness app must
        // install it or the mount throws.
        plugins: [createI18n({ legacy: false, locale: 'en-US', messages: { 'en-US': {} } })],
      },
    })
    const tempStore = useTempStore()
    await nextTick()

    const file = new File(['x'], 'a.txt', { type: 'text/plain' })
    const item: any = {
      id: 'upload-1', batchId: 'b1', createdAt: new Date().toISOString(),
      dir: '/', fileName: '', file, status: 'created', uploadedSize: 0, error: '', pausing: false,
    }
    tempStore.uploads = [...tempStore.uploads, item]
    await nextTick()

    // watch should have registered + enqueued + set pending
    expect(hasActiveUploads(wrapper.vm).value ?? (wrapper.vm as any).hasActiveUploads).toBe(true)
  })
})

function hasActiveUploads(vm: any) {
  return { value: (vm as any).hasActiveUploads }
}
