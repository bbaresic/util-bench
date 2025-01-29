import { isPlainObject, isArray } from './util-imports.js';

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
    for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        if (!isPlainObject(target) || !isPlainObject(source)) continue;
        const keys = Object.keys(source);

        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            const sourceValue = source[key];
            const targetValue = target[key];

            if (isPlainObject(sourceValue)) {
                if (!isPlainObject(targetValue)) target[key] = {};
                mergeDeep(target[key], sourceValue);
            } else if (isArray(sourceValue)) {
                if (!isArray(targetValue)) {
                    target[key] = [...sourceValue];
                } else {
                    for (let k = 0; k < sourceValue.length; k++) {
                        const item = sourceValue[k];
                        if (!targetValue.some(existingItem => deepEqual(existingItem, item))) {
                            targetValue.push(item);
                        }
                    }
                }
            } else {
                target[key] = sourceValue;
            }
        }
    }

    return target;
}
