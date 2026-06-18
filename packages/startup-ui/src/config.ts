/**
 * Optional router integration for Startup UI.
 *
 * Components that can drive navigation (currently SFilterGroup with `bind-to-query`) use the
 * router registered here, if any. Register it once at app start — e.g. with Inertia:
 *
 *   import { router } from '@inertiajs/vue3';
 *   app.use(StartupUI, { router });
 *
 * When no router is registered, those components fall back to the History API (the URL is kept
 * in sync, but no SPA refetch happens). This way Startup UI carries no hard dependency on Inertia
 * or any specific router — the integration is fully opt-in.
 */
export interface StartupUiRouter {
    /** Inertia-compatible visit. A thin custom adapter can satisfy the same shape. */
    get(url: string, data?: Record<string, any>, options?: Record<string, any>): void;
}

let registeredRouter: StartupUiRouter | null = null;

/** Register (or clear) the router used for navigation. Called via the plugin options or directly. */
export function setStartupUiRouter(router: StartupUiRouter | null | undefined): void {
    registeredRouter = router ?? null;
}

/** The registered router, or null when none was provided. */
export function getStartupUiRouter(): StartupUiRouter | null {
    return registeredRouter;
}
