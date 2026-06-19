import type { Component } from 'vue';

/**
 * Optional router / link / icon integration for Startup UI.
 *
 * A few components can drive SPA navigation or render icons. To keep the library free of any hard
 * dependency on InertiaJS or FontAwesome, the integration is injected once at app start — e.g.:
 *
 *   import { router, Link } from '@inertiajs/vue3';
 *   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 *   app.use(StartupUI, { router, link: Link, icon: FontAwesomeIcon });
 *
 * Used by:
 *   - router.get   → SPagination (per-page change), SFilterGroup (`bind-to-query`)
 *   - router.visit → SForm (declarative `action`/`method` submit)
 *   - link         → SMenu / SVerticalMenu / SPagination (nav links)
 *   - icon         → SActionIcon / SNote / SStatus / STooltip (renderer for the consumer-supplied `icon` prop)
 *
 * When nothing is registered, those components degrade gracefully: links render as a plain `<a>`
 * (full navigation), per-page/pagination falls back to the History API / `window.location`, SForm
 * relies on its `@submit` event, and the icon renderer falls back to a globally-registered
 * `FontAwesomeIcon`. So both Inertia and FontAwesome stay fully opt-in.
 */
export interface StartupUiRouter {
    /** Inertia-compatible `router.get` (SPagination, SFilterGroup bind-to-query). */
    get?(url: string, data?: Record<string, any>, options?: Record<string, any>): void;
    /** Inertia-compatible `router.visit` (SForm declarative submit). */
    visit?(url: string, options?: Record<string, any>): void;
}

/** A component for SPA navigation links (e.g. Inertia's `Link`). Defaults to a plain `<a>`. */
export type StartupUiLink = Component | string;

/**
 * A renderer component for the `icon` prop of SActionIcon / SNote / SStatus / STooltip (e.g.
 * `FontAwesomeIcon`, or any custom icon-set wrapper that accepts an `icon` prop). May be the
 * component itself or the name of a globally-registered one. Falls back to `'FontAwesomeIcon'`.
 */
export type StartupUiIcon = Component | string;

let registeredRouter: StartupUiRouter | null = null;
let registeredLink: StartupUiLink | null = null;
let registeredIcon: StartupUiIcon | null = null;

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

/** Register (or clear) the renderer used for the `icon` prop (e.g. FontAwesomeIcon or a custom one). */
export function setStartupUiIcon(icon: StartupUiIcon | null | undefined): void {
    registeredIcon = icon ?? null;
}

/** The registered icon renderer, or null when none was provided (callers fall back to `'FontAwesomeIcon'`). */
export function getStartupUiIcon(): StartupUiIcon | null {
    return registeredIcon;
}
