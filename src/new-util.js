import { isPlainObject } from './util-imports.js';

export function deepEqual(obj1, obj2, { checkTypes = false } = {}) {
    if (obj1 === obj2) return true;
    if (
        typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null ||
        (checkTypes && obj1.constructor !== obj2.constructor)
    ) {
        return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        if (!Object.hasOwn(obj2, key) || !deepEqual(obj1[key], obj2[key], { checkTypes })) {
            return false;
        }
    }
    return true;
}

export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    for (const source of sources) {
        if (!isPlainObject(target) || !isPlainObject(source)) continue;
        for (const key of Object.keys(source)) {
            const sourceValue = source[key];
            const targetValue = target[key];
            if (isPlainObject(sourceValue)) {
                if (!isPlainObject(targetValue)) target[key] = {};
                mergeDeep(target[key], sourceValue);
            } else if (Array.isArray(sourceValue)) {
                target[key] = Array.from(new Set([...(Array.isArray(targetValue) ? targetValue : []), ...sourceValue]));
            } else {
                target[key] = sourceValue;
            }
        }
    }
    return target;
}
