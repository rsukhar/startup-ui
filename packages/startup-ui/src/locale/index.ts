import { reactive, computed } from 'vue';
import en from './messages/en';
import ru from './messages/ru';
import enUS from './messages/en-US';
import { deepMerge } from '../utils/deepMerge';
import type { StartupUiMessages, StartupUiLocaleMessages } from './types';

export interface StartupUiOptions {
    /** Активная локаль. По умолчанию 'en'. */
    locale?: string;
    /** Словари сообщений для слияния поверх встроенных (по локалям). */
    messages?: StartupUiLocaleMessages;
}

const state = reactive({
    locale: 'en',
    messages: { en, ru, 'en-US': enUS } as Record<string, any>,
});

/**
 * Настройка локализации. Вызывается из plugin.install(app, options)
 * или напрямую для рантайм-конфигурации/смены локали.
 */
export function configureStartupUi(options: StartupUiOptions = {}): void {
    if (options.locale) state.locale = options.locale;
    if (options.messages) {
        state.messages = deepMerge(state.messages, options.messages);
    }
}

function resolve(key: string, locale: string): any {
    const dict = state.messages[locale];
    if (!dict) return undefined;
    return key.split('.').reduce<any>((acc, part) => (acc == null ? undefined : acc[part]), dict);
}

/**
 * Список локалей-кандидатов с фолбэком по базовому языку и итоговым en.
 * Напр. 'en-US' → ['en-US', 'en']; 'ru-RU' → ['ru-RU', 'ru', 'en'].
 */
function candidateLocales(locale: string): string[] {
    const result = [locale];
    const dash = locale.indexOf('-');
    if (dash > 0) result.push(locale.slice(0, dash));
    if (!result.includes('en')) result.push('en');
    return result;
}

/**
 * Вернуть «сырое» значение по ключу (для массивов/объектов: дни недели, месяцы, блоки редактора).
 * Фолбэк: точная локаль → базовый язык → en → сам ключ.
 */
export function tRaw<T = any>(key: string): T {
    for (const locale of candidateLocales(state.locale)) {
        const value = resolve(key, locale);
        if (value !== undefined) return value as T;
    }
    return key as unknown as T;
}

/**
 * Перевести строковый ключ с подстановкой плейсхолдеров {name}.
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

/** Композабл для использования внутри компонентов. */
export function useI18n() {
    return {
        t,
        tRaw,
        locale: computed(() => state.locale),
    };
}

export type { StartupUiMessages, StartupUiLocaleMessages, DeepPartial } from './types';
