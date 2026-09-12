# Screen capture overlay messages

These per-locale files (`en-US.ts`, `zh-CN.ts`, ...) hold the strings used
**only** by the screen capture overlay itself (toolbar labels, selection
handle names, status/error text). They are read by `../capture-localization.ts`
via `import.meta.glob('./locales/*.ts', ...)` and formatted with the overlay's
own `formatCaptureMessage()` — plain `{placeholder}` substitution, not ICU.

## Why this isn't in `src/locales/`

The capture overlay is mounted as a standalone Vue app in a separate Tauri
window (see `../bootstrap.ts`) and intentionally does not load the main app's
vue-i18n plugin, Pinia stores, router, or GraphQL client — it must show up
instantly the moment the user triggers a screenshot, without waiting on the
main app's bootstrap (persisted locale prefs, lazy locale chunk loading, etc).

`vite.config.ts`'s `VueI18nPlugin` precompiles every `.ts` file under
`src/locales/**` into vue-i18n message ASTs. If these overlay strings lived
there, the plugin would precompile them too, and `formatCaptureMessage()`
would receive a compiled AST instead of a plain string and crash. Keeping
this directory outside `src/locales/` avoids that conflict structurally —
no `exclude` glob or naming convention needs to keep them apart.

`src/locales/<locale>/screen-capture.ts` still exists, but only holds the
`screen_capture.ui.*` keys — those are genuinely read via the app's real
`$t()` (e.g. `ChatInput.vue`, `CaptureShortcutModal.vue`), so they should be
precompiled like any other locale file.

## Adding a new capture string

1. Add the key to `CaptureMessages` in `../capture-localization.ts`.
2. Add the value to all 17 locale files here.
3. `tests/views/screen-capture/capture-localization.test.ts` asserts every
   locale exposes the exact same key set — it will fail if one is missing.
