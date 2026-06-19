import { reactive, computed } from 'vue';
import en from './messages/en';
import ru from './messages/ru';
import enUS from './messages/en-US';
import { deepMerge } from '../utils/deepMerge';
import { setStartupUiRouter, setStartupUiLink, setStartupUiIcon, type StartupUiRouter, type StartupUiLink, type StartupUiIcon } from '../config';
import type { StartupUiMessages, StartupUiLocaleMessages } from './types';

export interface StartupUiOptions {
    /** Active locale. Defaults to 'en'. */
    locale?: string;
    /** Message dictionaries to merge on top of the built-in ones (by locale). */
    messages?: StartupUiLocaleMessages;
    /**
     * Optional router for navigation-driving components (SForm submit, SPagination, SFilterGroup
     * `bind-to-query`). Pass Inertia's `router`, or any object with compatible `get`/`visit`.
     * When omitted, those components fall back to the History API / native navigation.
     */
    router?: StartupUiRouter | null;
    /**
     * Optional link component for SPA navigation links (SMenu / SVerticalMenu / SPagination).
     * Pass Inertia's `Link`. When omitted, a plain `<a>` is used.
     */
    link?: StartupUiLink | null;
    /**
     * Optional renderer for the `icon` prop of SActionIcon / SNote / SStatus / STooltip. Pass
     * `FontAwesomeIcon` (or any custom icon-set wrapper accepting an `icon` prop). When omitted,
     * a globally-registered `FontAwesomeIcon` is used.
     */
    icon?: StartupUiIcon | null;
}

const state = reactive({
    locale: 'en',
    messages: { en, ru, 'en-US': enUS } as Record<string, any>,
});

/**
 * Localization setup. Called from plugin.install(app, options)
 * or directly for runtime configuration / locale switching.
 */
export function configureStartupUi(options: StartupUiOptions = {}): void {
    if (options.locale) state.locale = options.locale;
    if (options.messages) {
        state.messages = deepMerge(state.messages, options.messages);
    }
    if (options.router !== undefined) setStartupUiRouter(options.router);
    if (options.link !== undefined) setStartupUiLink(options.link);
    if (options.icon !== undefined) setStartupUiIcon(options.icon);
}

function resolve(key: string, locale: string): any {
    const dict = state.messages[locale];
    if (!dict) return undefined;
    return key.split('.').reduce<any>((acc, part) => (acc == null ? undefined : acc[part]), dict);
}

/**
 * List of candidate locales with a fallback to the base language and a final en.
 * E.g. 'en-US' → ['en-US', 'en']; 'ru-RU' → ['ru-RU', 'ru', 'en'].
 */
function candidateLocales(locale: string): string[] {
    const result = [locale];
    const dash = locale.indexOf('-');
    if (dash > 0) result.push(locale.slice(0, dash));
    if (!result.includes('en')) result.push('en');
    return result;
}

/**
 * Return the "raw" value by key (for arrays/objects: weekdays, months, editor blocks).
 * Fallback: exact locale → base language → en → the key itself.
 */
export function tRaw<T = any>(key: string): T {
    for (const locale of candidateLocales(state.locale)) {
        const value = resolve(key, locale);
        if (value !== undefined) return value as T;
    }
    return key as unknown as T;
}

/**
 * Translate a string key with substitution of {name} placeholders.
 */
export function t(key: string, params?: Record<string, any>): string {
    const value = tRaw<any>(key);
    if (typeof value !== 'string') {
        return value === undefined ? key : String(value);
    }
    if (!params) return value;
    return value.replace(/\{(\w+)\}/g, (_, name) => (params[name] != null ? String(params[name]) : `{${name}}`));
}

export function setLocale(locale: string): void {
    state.locale = locale;
}

export function getLocale(): string {
    return state.locale;
}

/** Composable for use inside components. */
export function useI18n() {
    return {
        t,
        tRaw,
        locale: computed(() => state.locale),
    };
}

export type { StartupUiMessages, StartupUiLocaleMessages, DeepPartial } from './types';
