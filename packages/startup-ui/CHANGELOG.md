# Changelog

All notable changes to `startup-ui` are documented here. This project follows
[Semantic Versioning](https://semver.org/).

## Unreleased

### Added

- **`SButton color="gold"`** — money/premium CTA accent: gold gradient with dark text (works with
  `outlined` and `transparent` too). Uses the new `--s-gold`, `--s-gold-dark`, `--s-gold-light`,
  `--s-gold-lightest` palette tokens, added to `defaults.css`.
- **`SStepper`** — step indicator for multi-step flows: completed steps get a check mark and are
  clickable to navigate back; steps use the same `options` formats as `SSelect` / `SRadioGroup`.

### Fixed

- **`SRadioGroup` in `buttons` style now respects `--s-border-radius`** — corner radii of the first
  and last segments (both horizontal and `vertical`) were hardcoded to `5px`.

## 1.1.0 — 2026-07-06

### Added

- **`SSlider`** — a slider for picking a numeric value from a range: `v-model`, `min` / `max` /
  `step`, a `unit` suffix, a slot for custom value display, `disabled`.

## 1.0.4 — 2026-06-21

### Changed

- **`STable` default cell padding restored to the pre-1.0 value (`0.8rem`).** The tighter `0.5rem`
  padding introduced during the 1.0 work is now opt-in via the new **`compact`** prop:
  `<STable compact>`.

## 1.0.0 — 2026-06-19

First stable release. This major version contains several breaking changes — see the full
[migration guide](https://startup-ui.ru/pages/welcome/extras/migration) before upgrading.

### Breaking

- **Default locale is now English** (was Russian). Pass `{ locale: 'ru' }` to restore Russian.
- **The library no longer bundles the `--s-*` palette.** Import `startup-ui/defaults.css` or define
  the variables yourself.
- **InertiaJS is now optional.** SPA navigation (SForm submit, SPagination, SFilterGroup `bind-to-query`,
  menu links) activates only when you inject `router` / `link`: `app.use(StartupUI, { router, link })`.
- **FontAwesome is now optional.** Component "chrome" uses inline SVG; FontAwesome is only needed for
  icons you pass via an `icon` prop. Register `FontAwesomeIcon` globally or inject a renderer:
  `app.use(StartupUI, { icon: FontAwesomeIcon })`.
- **`SMenu` replaces `SDropdownMenu` and `SHorizontalMenu`** (both removed) — a horizontal menu with
  dropdown submenus driven by an `items` prop.
- **`SDatePicker`:** `week-day-names` / `month-names` props removed (names now come from the locale).
- `SButton` no longer forces `max-width: fit-content`; `SForm` `titlesWidth` no longer affects top
  titles; `SCheckboxGroup` emits a fresh array via `update:modelValue`.

### Added

- i18n core: `configureStartupUi`, `t`, per-locale message overrides, regional locale fallback.
- Optional integration injection via the plugin: `app.use(StartupUI, { router, link, icon })`.
- Machine-readable docs shipped in the package (`AGENTS.md`, `CLAUDE.md`, `llms/`) and hosted
  (`/llms.txt`, `/llms-full.txt`, append `.md` to any docs URL) for AI coding agents.
- `SMenu`; `SDatePicker` `clearable` + 12-hour (am/pm) time; extensibility props on `SHtmlEditor`;
  `SInput` `empty-value`; `STree` `#node-actions` slot; object-array `options` with
  `option-label` / `option-value` for `SSelect` / `SRadioGroup` / `SCheckboxGroup`.

### Requirements

- Vue ≥ 3.5, `@vueuse/core` ≥ 14. `@inertiajs/vue3` 2.x/3.x only if you use Inertia integration.
