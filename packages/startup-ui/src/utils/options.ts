export interface NormalizedOption {
    value: any;
    label: any;
}

export interface NormalizeOptionsConfig {
    /** Ключ подписи при передаче массива объектов (по умолчанию 'label') */
    optionLabel?: string;
    /** Ключ значения при передаче массива объектов (по умолчанию 'value') */
    optionValue?: string;
    /**
     * Приводить строковые ключи объекта-карты к boolean/number
     * (ключи объектов в JS всегда строки). Используется в SRadioGroup.
     */
    coerceKeys?: boolean;
}

function coerce(value: string): any {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value !== '' && !isNaN(Number(value))) return Number(value);
    return value;
}

/**
 * Приводит options к единому виду [{ value, label }, ...].
 * Поддерживает:
 *  - карту           { value1: label1, value2: label2 }
 *  - массив пар      [[value1, label1], [value2, label2]]
 *  - массив объектов [{ value, label }, ...] (ключи настраиваются optionLabel/optionValue)
 *  - массив примитивов ['a', 'b'] → value === label
 */
export function normalizeOptions(
    options: Record<string | number, any> | any[] | null | undefined,
    config: NormalizeOptionsConfig = {},
): NormalizedOption[] {
    const labelKey = config.optionLabel ?? 'label';
    const valueKey = config.optionValue ?? 'value';

    if (!options) return [];

    if (Array.isArray(options)) {
        return options.map((item) => {
            if (Array.isArray(item)) return { value: item[0], label: item[1] };
            if (item !== null && typeof item === 'object') return { value: item[valueKey], label: item[labelKey] };
            return { value: item, label: item };
        });
    }

    return Object.entries(options).map(([key, label]) => ({
        value: config.coerceKeys ? coerce(key) : key,
        label,
    }));
}
