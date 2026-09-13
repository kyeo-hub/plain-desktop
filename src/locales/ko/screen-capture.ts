import type { CaptureLocaleModule } from '@/views/screen-capture/capture-localization'

export default {
  screen_capture: {
    ui: {
      menuA11y: "스크린샷 옵션",
      shortcutSettings: "단축키 설정",
      openPermissionSettings: "화면 기록 권한",
      shortcutCurrent: "현재 단축키",
      shortcutRecording: "새 단축키를 누르세요…",
      shortcutRecordHint: "클릭 후 키 조합을 누르세요",
      shortcutInvalidKey: "영문, 숫자 또는 F 키에 보조 키를 하나 이상 조합하세요",
      shortcutConflictHint: "단축키가 반응하지 않으면 WeChat, QQ 등 다른 앱이 사용 중일 수 있습니다. 다른 조합을 선택하세요.",
      shortcutReset: "기본값으로 되돌리기",
      shortcutSave: "저장",
      shortcutSaveFailed: "단축키를 저장하지 못했습니다. 다시 시도하세요.",
    },
  },
} satisfies CaptureLocaleModule
