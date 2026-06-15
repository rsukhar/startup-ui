type Dict = Record<string, any>;

export function isPlainObject(value: any): value is Dict {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Глубокое слияние простых объектов. Массивы и скаляры из source заменяют значения target.
 * Возвращает новый объект, исходные не мутируются.
 */
export function deepMerge<T extends Dict>(target: T, source: Dict): T {
    const output: Dict = { ...target };

    for (const key of Object.keys(source)) {
        const sourceValue = source[key];
        const targetValue = output[key];

        if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
            output[key] = deepMerge(targetValue, sourceValue);
        } else {
            output[key] = sourceValue;
        }
    }

    return output as T;
}
