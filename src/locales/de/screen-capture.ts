import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Screenshot-Optionen",
      shortcutSettings: "Tastenkürzel-Einstellungen",
      openPermissionSettings: "Bildschirmaufnahme-Berechtigung",
      shortcutCurrent: "Aktuelles Kürzel",
      shortcutRecording: "Neues Kürzel drücken…",
      shortcutRecordHint: "Klicken und eine Tastenkombination drücken",
      shortcutInvalidKey: "Buchstabe, Ziffer oder F-Taste mit mindestens einem Modifier verwenden",
      shortcutConflictHint: "Reagiert das Kürzel nicht, verwendet es womöglich eine andere App (WeChat, QQ…) — bitte eine andere Kombination wählen.",
      shortcutReset: "Auf Standard zurücksetzen",
      shortcutSave: "Speichern",
      shortcutSaveFailed: "Kürzel konnte nicht gespeichert werden. Bitte erneut versuchen.",
    },
  },
} satisfies CaptureLocaleModule
