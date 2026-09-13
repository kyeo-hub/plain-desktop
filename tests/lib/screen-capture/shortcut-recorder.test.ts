import { describe, expect, it } from 'vitest'
import { acceleratorFromKeyboardEvent, formatAccelerator } from '@/lib/screen-capture/shortcut-recorder'

function keyEvent(overrides: Partial<KeyboardEvent> & { key: string }): KeyboardEvent {
  return {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    ...overrides,
  } as KeyboardEvent
}

describe('acceleratorFromKeyboardEvent', () => {
  it('uses mac modifier names in canonical order', () => {
    const event = keyEvent({ key: 'a', ctrlKey: true, altKey: true, metaKey: true })
    expect(acceleratorFromKeyboardEvent(event, true)).toBe('Control+Option+Command+A')
  })

  it('maps meta to Super outside macOS and keeps Alt unrenamed', () => {
    const event = keyEvent({ key: 'x', ctrlKey: true, altKey: true })
    expect(acceleratorFromKeyboardEvent(event, false)).toBe('Control+Alt+X')
    const superEvent = keyEvent({ key: 'k', metaKey: true })
    expect(acceleratorFromKeyboardEvent(superEvent, false)).toBe('Super+K')
  })

  it('accepts digits and f-keys but rejects bare keys', () => {
    expect(acceleratorFromKeyboardEvent(keyEvent({ key: '3', metaKey: true }), true)).toBe('Command+3')
    expect(acceleratorFromKeyboardEvent(keyEvent({ key: 'F2', ctrlKey: true }), false)).toBe('Control+F2')
    expect(acceleratorFromKeyboardEvent(keyEvent({ key: 'a' }), true)).toBeNull()
  })

  it('rejects punctuation and modifier-only presses', () => {
    expect(acceleratorFromKeyboardEvent(keyEvent({ key: '/', ctrlKey: true }), true)).toBeNull()
    expect(acceleratorFromKeyboardEvent(keyEvent({ key: 'Shift', shiftKey: true }), true)).toBeNull()
    expect(acceleratorFromKeyboardEvent(keyEvent({ key: 'Meta', metaKey: true }), true)).toBeNull()
  })
})

describe('formatAccelerator', () => {
  it('renders mac modifiers as glyphs with the key last', () => {
    expect(formatAccelerator('Control+Option+Command+A', true)).toBe('⌃⌥⌘A')
    expect(formatAccelerator('Command+3', true)).toBe('⌘3')
  })

  it('keeps plain text off macOS and passes through unknown parts', () => {
    expect(formatAccelerator('Ctrl+Alt+X', false)).toBe('Ctrl+Alt+X')
    expect(formatAccelerator('Control+Option+Command+A', false)).toBe('Control+Option+Command+A')
    expect(formatAccelerator('', true)).toBe('')
  })
})
