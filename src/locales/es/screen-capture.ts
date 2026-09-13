import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Opciones de captura",
      shortcutSettings: "Ajustes de atajo",
      openPermissionSettings: "Permiso de grabación de pantalla",
      shortcutCurrent: "Atajo actual",
      shortcutRecording: "Pulsa la nueva combinación…",
      shortcutRecordHint: "Haz clic y pulsa una combinación de teclas",
      shortcutInvalidKey: "Usa una letra, un número o una tecla F con al menos un modificador",
      shortcutConflictHint: "Si el atajo no responde, otra aplicación (WeChat, QQ…) puede estar usándolo: elige otra combinación.",
      shortcutReset: "Restaurar valor predeterminado",
      shortcutSave: "Guardar",
      shortcutSaveFailed: "No se pudo guardar el atajo. Inténtalo de nuevo.",
    },
  },
} satisfies CaptureLocaleModule
