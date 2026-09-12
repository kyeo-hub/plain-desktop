import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Options de capture d’écran",
      shortcutSettings: "Paramètres du raccourci",
      openPermissionSettings: "Autorisation d’enregistrement de l’écran",
      shortcutCurrent: "Raccourci actuel",
      shortcutRecording: "Appuyez sur le nouveau raccourci…",
      shortcutRecordHint: "Cliquez puis appuyez sur une combinaison de touches",
      shortcutInvalidKey: "Utilisez une lettre, un chiffre ou une touche F avec au moins un modificateur",
      shortcutConflictHint: "Si le raccourci ne répond pas, une autre application (WeChat, QQ…) l’utilise peut-être — choisissez une autre combinaison.",
      shortcutReset: "Rétablir par défaut",
      shortcutSave: "Enregistrer",
      shortcutSaveFailed: "Impossible d’enregistrer le raccourci. Réessayez.",
    },
  },
} satisfies CaptureLocaleModule
