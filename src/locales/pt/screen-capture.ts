import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Opções de captura de tela",
      shortcutSettings: "Configurações de atalho",
      openPermissionSettings: "Permissão de gravação de tela",
      shortcutCurrent: "Atalho atual",
      shortcutRecording: "Pressione a nova combinação…",
      shortcutRecordHint: "Clique e pressione uma combinação de teclas",
      shortcutInvalidKey: "Use uma letra, número ou tecla F com pelo menos um modificador",
      shortcutConflictHint: "Se o atalho não responder, outro app (WeChat, QQ…) pode estar usando-o — escolha outra combinação.",
      shortcutReset: "Restaurar padrão",
      shortcutSave: "Salvar",
      shortcutSaveFailed: "Não foi possível salvar o atalho. Tente novamente.",
    },
  },
} satisfies CaptureLocaleModule
