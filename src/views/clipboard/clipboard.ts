import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useTempStore } from '@/stores/temp'
import { initLazyQuery, clipboardGQL } from '@/lib/api/query'
import { initMutation, cancelClipboardGQL } from '@/lib/api/mutation'
import type { IClipboard } from '@/lib/interfaces'
import toast from '@/components/toaster'

export function useClipboardData() {
  const mainStore = useMainStore()
  const { app } = storeToRefs(useTempStore())
  const { t } = useI18n()

  const page = ref(1)
  const limit = computed(() => mainStore.pageSize)
  const items = ref<IClipboard[]>([])
  const total = ref(0)

  const { loading, fetch } = initLazyQuery({
    handle: (data: { clipboard: IClipboard[]; clipboardCount: number }, error: string) => {
      if (error) {
        toast(t(error), 'error')
      } else if (data) {
        items.value = data.clipboard
        total.value = data.clipboardCount
      }
    },
    document: clipboardGQL,
    variables: () => ({
      offset: (page.value - 1) * limit.value,
      limit: limit.value,
      query: '',
    }),
  })

  const gotoPage = (p: number) => {
    page.value = p
    fetch()
  }

  const onChangePageSize = (size: number) => {
    mainStore.pageSize = size
    page.value = 1
    fetch()
  }

  const { mutate: cancelClipboard } = initMutation({ document: cancelClipboardGQL })

  const deleteItem = (item: IClipboard) => {
    items.value = items.value.filter((it) => it.id !== item.id)
    total.value--
    cancelClipboard({ ids: [item.id] })
  }

  fetch()

  return {
    app, items, total, page, limit, loading,
    gotoPage, onChangePageSize, deleteItem,
  }
}
