import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "截图选项",
      shortcutSettings: "快捷键设置",
      openPermissionSettings: "屏幕录制权限",
      shortcutCurrent: "当前快捷键",
      shortcutRecording: "按下新的快捷键…",
      shortcutRecordHint: "点击后按下组合键",
      shortcutInvalidKey: "请使用字母、数字或 F 键，并至少带一个修饰键",
      shortcutConflictHint: "如果快捷键无响应，可能被微信、QQ 等应用占用，请换一个组合。",
      shortcutReset: "恢复默认",
      shortcutSave: "保存",
      shortcutSaveFailed: "快捷键保存失败，请重试。",
    },
  },
} satisfies CaptureLocaleModule
