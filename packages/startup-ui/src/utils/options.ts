export interface NormalizedOption {
    value: any;
    label: any;
}

export interface NormalizeOptionsConfig {
    /** Label key when passing an array of objects (default 'label') */
    optionLabel?: string;
    /** Value key when passing an array of objects (default 'value') */
    optionValue?: string;
    /**
     * Coerce the map object's string keys to boolean/number
     * (object keys in JS are always strings). Used in SRadioGroup.
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
 * Normalizes options to a uniform shape [{ value, label }, ...].
 * Supports:
 *  - a map           { value1: label1, value2: label2 }
 *  - an array of pairs      [[value1, label1], [value2, label2]]
 *  - an array of objects [{ value, label }, ...] (keys configurable via optionLabel/optionValue)
 *  - an array of primitives ['a', 'b'] → value === label
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
