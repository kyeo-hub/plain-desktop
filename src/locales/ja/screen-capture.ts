import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "スクリーンショットのオプション",
      shortcutSettings: "ショートカット設定",
      openPermissionSettings: "画面収録の権限",
      shortcutCurrent: "現在のショートカット",
      shortcutRecording: "新しいショートカットを押してください…",
      shortcutRecordHint: "クリックしてキーの組み合わせを入力",
      shortcutInvalidKey: "英数字または F キーに修飾キーを組み合わせてください",
      shortcutConflictHint: "反応しない場合は WeChat・QQ などが使用中の可能性があります。別の組み合わせを選んでください。",
      shortcutReset: "デフォルトに戻す",
      shortcutSave: "保存",
      shortcutSaveFailed: "ショートカットを保存できませんでした。もう一度お試しください。",
    },
  },
} satisfies CaptureLocaleModule
