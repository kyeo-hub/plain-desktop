import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Параметры скриншота",
      shortcutSettings: "Настройки сочетания клавиш",
      openPermissionSettings: "Разрешение на запись экрана",
      shortcutCurrent: "Текущее сочетание",
      shortcutRecording: "Нажмите новое сочетание…",
      shortcutRecordHint: "Щёлкните и нажмите комбинацию клавиш",
      shortcutInvalidKey: "Используйте букву, цифру или F-клавишу хотя бы с одним модификатором",
      shortcutConflictHint: "Если сочетание не срабатывает, его может использовать другое приложение (WeChat, QQ…) — выберите другое.",
      shortcutReset: "Сбросить по умолчанию",
      shortcutSave: "Сохранить",
      shortcutSaveFailed: "Не удалось сохранить сочетание. Повторите попытку.",
    },
  },
} satisfies CaptureLocaleModule
