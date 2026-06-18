import type { Component } from 'vue';

/**
 * Optional router / link integration for Startup UI.
 *
 * A few components can drive SPA navigation. To keep the library free of any hard dependency on
 * InertiaJS (or any specific router), the integration is injected once at app start — e.g.:
 *
 *   import { router, Link } from '@inertiajs/vue3';
 *   app.use(StartupUI, { router, link: Link });
 *
 * Used by:
 *   - router.get   → SPagination (per-page change), SFilterGroup (`bind-to-query`)
 *   - router.visit → SForm (declarative `action`/`method` submit)
 *   - link         → SDropdownMenu / SHorizontalMenu / SVerticalMenu / SPagination (nav links)
 *
 * When nothing is registered, those components degrade gracefully: links render as a plain `<a>`
 * (full navigation), per-page/pagination falls back to the History API / `window.location`, and
 * SForm relies on its `@submit` event. So Inertia stays fully opt-in.
 */
export interface StartupUiRouter {
    /** Inertia-compatible `router.get` (SPagination, SFilterGroup bind-to-query). */
    get?(url: string, data?: Record<string, any>, options?: Record<string, any>): void;
    /** Inertia-compatible `router.visit` (SForm declarative submit). */
    visit?(url: string, options?: Record<string, any>): void;
}

/** A component for SPA navigation links (e.g. Inertia's `Link`). Defaults to a plain `<a>`. */
export type StartupUiLink = Component | string;

let registeredRouter: StartupUiRouter | null = null;
let registeredLink: StartupUiLink | null = null;

/** Register (or clear) the router used for navigation. Called via the plugin options or directly. */
export function setStartupUiRouter(router: StartupUiRouter | null | undefined): void {
    registeredRouter = router ?? null;
}

/** The registered router, or null when none was provided. */
export function getStartupUiRouter(): StartupUiRouter | null {
    return registeredRouter;
}

/** Register (or clear) the link component used for SPA navigation links. */
export function setStartupUiLink(link: StartupUiLink | null | undefined): void {
    registeredLink = link ?? null;
}

/** The registered link component, or null when none was provided (callers fall back to `'a'`). */
export function getStartupUiLink(): StartupUiLink | null {
    return registeredLink;
}
