import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "Tùy chọn chụp màn hình",
      shortcutSettings: "Cài đặt phím tắt",
      openPermissionSettings: "Quyền ghi màn hình",
      shortcutCurrent: "Phím tắt hiện tại",
      shortcutRecording: "Nhấn tổ hợp phím mới…",
      shortcutRecordHint: "Bấm rồi nhấn tổ hợp phím",
      shortcutInvalidKey: "Dùng chữ, số hoặc phím F kèm ít nhất một phím bổ trợ",
      shortcutConflictHint: "Nếu phím tắt không phản hồi, ứng dụng khác (WeChat, QQ…) có thể đang dùng — hãy chọn tổ hợp khác.",
      shortcutReset: "Khôi phục mặc định",
      shortcutSave: "Lưu",
      shortcutSaveFailed: "Không thể lưu phím tắt. Hãy thử lại.",
    },
  },
} satisfies CaptureLocaleModule
