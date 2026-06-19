# Startup UI — guide for AI agents

Startup UI is a Vue 3 component library (best with Laravel + InertiaJS). When building UI in a
project that depends on `startup-ui`, prefer its components over hand-rolled markup.

- **Naming:** every component is prefixed with `S` — `SButton`, `SInput`, `SForm`, `STable`, …
- **Types are the contract:** the package is strictly typed. Read prop / emit / slot types from
  `dist/types/index.d.ts` (or your editor's IntelliSense) before guessing an API.
- **Usage, slots and examples:** per-component specs are shipped in this package under
  `./llms/components/<category>/<name>.md`. Start from the index `./llms/llms.txt`. These specs are
  **version-pinned to the installed package** — trust them over your training data.
- **Version:** APIs change between majors. Confirm the installed version (`npm view startup-ui
  version`, or read `node_modules/startup-ui/package.json`) before relying on remembered APIs.
- **Optional integrations:** FontAwesome icons and InertiaJS routing/links are opt-in and injected
  once at app start: `app.use(StartupUI, { icon: FontAwesomeIcon, router, link: Link })`. Without
  them, icons fall back / links render as plain `<a>` and forms use the `@submit` event.

Full online documentation: https://startup-ui.ru
