import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Opzioni screenshot",
      shortcutSettings: "Impostazioni scorciatoia",
      openPermissionSettings: "Permesso di registrazione schermo",
      shortcutCurrent: "Scorciatoia attuale",
      shortcutRecording: "Premi la nuova combinazione…",
      shortcutRecordHint: "Fai clic e premi una combinazione di tasti",
      shortcutInvalidKey: "Usa una lettera, un numero o un tasto F con almeno un modificatore",
      shortcutConflictHint: "Se la scorciatoia non risponde, un'altra app (WeChat, QQ…) potrebbe usarla: scegline un'altra.",
      shortcutReset: "Ripristina predefinita",
      shortcutSave: "Salva",
      shortcutSaveFailed: "Impossibile salvare la scorciatoia. Riprova.",
    },
  },
} satisfies CaptureLocaleModule
