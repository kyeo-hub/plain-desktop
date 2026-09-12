import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Ekran görüntüsü seçenekleri",
      shortcutSettings: "Kısayol ayarları",
      openPermissionSettings: "Ekran kaydı izni",
      shortcutCurrent: "Geçerli kısayol",
      shortcutRecording: "Yeni kısayola basın…",
      shortcutRecordHint: "Tıklayın ve bir tuş kombinasyonuna basın",
      shortcutInvalidKey: "En az bir değiştirici ile harf, rakam veya F tuşu kullanın",
      shortcutConflictHint: "Kısayol yanıt vermiyorsa başka bir uygulama (WeChat, QQ…) kullanıyor olabilir — farklı bir kombinasyon seçin.",
      shortcutReset: "Varsayılana sıfırla",
      shortcutSave: "Kaydet",
      shortcutSaveFailed: "Kısayol kaydedilemedi. Tekrar deneyin.",
    },
  },
} satisfies CaptureLocaleModule
