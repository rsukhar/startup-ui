type Dict = Record<string, any>;

export function isPlainObject(value: any): value is Dict {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Deep merge of plain objects. Arrays and scalars from source replace target values.
 * Returns a new object, the originals are not mutated.
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
