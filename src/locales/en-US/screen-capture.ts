import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: 'Screen capture options',
      shortcutSettings: 'Shortcut settings',
      openPermissionSettings: 'Screen recording permission',
      shortcutCurrent: 'Current shortcut',
      shortcutRecording: 'Press the new shortcut…',
      shortcutRecordHint: 'Click, then press a key combination',
      shortcutInvalidKey: 'Use a letter, digit, or F-key plus at least one modifier',
      shortcutConflictHint: 'If the shortcut does not respond, another app (WeChat, QQ…) may be using it — pick a different combination.',
      shortcutReset: 'Reset to default',
      shortcutSave: 'Save',
      shortcutSaveFailed: 'Could not save the shortcut. Try again.',
    },
  },
} satisfies CaptureLocaleModule
