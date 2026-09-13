import { isMacPlatform } from '@/lib/platform'

export interface RecorderModifiers {
  control: boolean
  alt: boolean
  shift: boolean
  meta: boolean
}

// Canonical Tauri accelerator for a keyboard event. Letters and digits become
// "A" / "3", F-keys stay "F1"-"F12"; anything else (punctuation, IME keys) is
// rejected because accelerator parsing of those names is not portable.
export function acceleratorFromKeyboardEvent(
  event: KeyboardEvent,
  isMac: boolean = isMacPlatform(),
): string | null {
  const key = normalizeKey(event)
  if (!key) {
    return null
  }
  const hasModifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey
  if (!hasModifier) {
    return null
  }
  const parts: string[] = []
  if (event.ctrlKey) parts.push('Control')
  if (event.altKey) parts.push(isMac ? 'Option' : 'Alt')
  if (event.shiftKey) parts.push('Shift')
  if (event.metaKey) parts.push(isMac ? 'Command' : 'Super')
  parts.push(key)
  return parts.join('+')
}

function normalizeKey(event: KeyboardEvent): string | null {
  const key = event.key
  if (/^[a-z]$/i.test(key)) {
    return key.toUpperCase()
  }
  if (/^[0-9]$/.test(key)) {
    return key
  }
  if (/^F([1-9]|1[0-9])$/.test(key)) {
    return key
  }
  return null
}

export function hasModifierIn(event: KeyboardEvent): boolean {
  return event.ctrlKey || event.altKey || event.metaKey || event.shiftKey
}

const MAC_KEY_SYMBOLS: Record<string, string> = {
  Control: '⌃',
  Option: '⌥',
  Alt: '⌥',
  Shift: '⇧',
  Command: '⌘',
  CommandOrControl: '⌘',
  Super: '⌘',
  Meta: '⌘',
}

// macOS convention shows modifiers as glyphs ("⌃⌥⌘A"); other platforms keep
// the plain text form ("Ctrl+Alt+X").
export function formatAccelerator(accelerator: string, isMac: boolean): string {
  if (!accelerator) {
    return accelerator
  }
  const parts = accelerator.split('+').map((part) => part.trim())
  const key = parts.pop() ?? ''
  if (!isMac) {
    return [...parts, key].join('+')
  }
  return parts.map((part) => MAC_KEY_SYMBOLS[part] ?? part).join('') + key
}
