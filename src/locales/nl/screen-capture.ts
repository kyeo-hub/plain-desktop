import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Schermafbeeldingsopties",
      shortcutSettings: "Sneltoetsinstellingen",
      openPermissionSettings: "Schermopnamemachtiging",
      shortcutCurrent: "Huidige sneltoets",
      shortcutRecording: "Druk de nieuwe sneltoets in…",
      shortcutRecordHint: "Klik en druk een toetsencombinatie in",
      shortcutInvalidKey: "Gebruik een letter, cijfer of F-toets met minstens één modificatietoets",
      shortcutConflictHint: "Als de sneltoets niet reageert, gebruikt mogelijk een andere app (WeChat, QQ…) hem — kies een andere combinatie.",
      shortcutReset: "Terug naar standaard",
      shortcutSave: "Opslaan",
      shortcutSaveFailed: "Kon de sneltoets niet opslaan. Probeer het opnieuw.",
    },
  },
} satisfies CaptureLocaleModule
