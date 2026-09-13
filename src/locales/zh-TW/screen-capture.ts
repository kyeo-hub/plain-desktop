import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "截圖選項",
      shortcutSettings: "快速鍵設定",
      openPermissionSettings: "螢幕錄製權限",
      shortcutCurrent: "目前快速鍵",
      shortcutRecording: "按下新的快速鍵…",
      shortcutRecordHint: "點擊後按下組合鍵",
      shortcutInvalidKey: "請使用字母、數字或 F 鍵，並至少帶一個修飾鍵",
      shortcutConflictHint: "如果快速鍵沒有反應，可能被微信、QQ 等應用佔用，請換一個組合。",
      shortcutReset: "恢復預設",
      shortcutSave: "儲存",
      shortcutSaveFailed: "快速鍵儲存失敗，請重試。",
    },
  },
} satisfies CaptureLocaleModule
