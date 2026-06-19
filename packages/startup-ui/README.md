# Startup UI

Vue 3 UI component library for IT startups — best served with Laravel + InertiaJS.

- 📚 Documentation: https://startup-ui.ru
- 🧩 Every component is prefixed with `S` (`SButton`, `SInput`, `SForm`, `STable`, …) and fully typed.

## Install

```sh
npm install startup-ui
```

```js
// app.js
import StartupUI from 'startup-ui';
import 'startup-ui/dist/index.css';
import 'startup-ui/defaults.css'; // default --s-* palette (or define your own)

app.use(StartupUI);
```

```vue
<template>
  <SButton>It works!</SButton>
</template>
<script setup>
import { SButton } from 'startup-ui';
</script>
```

Optional integrations are injected once at startup (FontAwesome icons, InertiaJS routing/links —
all opt-in):

```js
app.use(StartupUI, { icon: FontAwesomeIcon, router, link: Link });
```

## 🤖 For AI agents

This package ships its own machine-readable docs, **version-pinned to the installed version** and
readable offline — no network needed:

- **[`AGENTS.md`](./AGENTS.md)** — short usage rules for this library (start here).
- **`llms/llms.txt`** — index of every component.
- **`llms/components/<category>/<name>.md`** — full spec (props, slots, examples) per component.

When generating UI in a project that depends on `startup-ui`, read `AGENTS.md`, then the relevant
component spec under `llms/`. Prefer these over training data — component APIs change between
versions. (Claude Code reads `CLAUDE.md`, which imports `AGENTS.md`.)

## License

MIT
