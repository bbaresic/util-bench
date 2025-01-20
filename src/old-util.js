import { isPlainObject, isArray } from './util-imports.js';

export function deepEqualOld(obj1, obj2, { checkTypes = false } = {}) {
    if (obj1 === obj2) return true;
    else if (
        (typeof obj1 === 'object' && obj1 !== null) &&
        (typeof obj2 === 'object' && obj2 !== null) &&
        (!checkTypes || (obj1.constructor === obj2.constructor))
    ) {
        const props1 = Object.keys(obj1);
        if (props1.length !== Object.keys(obj2).length) return false;
        for (let prop of props1) {
            if (obj2.hasOwnProperty(prop)) {
                if (!deepEqualOld(obj1[prop], obj2[prop], { checkTypes })) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

export function mergeDeepOld(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isPlainObject(target) && isPlainObject(source)) {
        for (const key in source) {
            if (isPlainObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeepOld(target[key], source[key]);
            } else if (isArray(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: [...source[key]] });
                } else if (isArray(target[key])) {
                    source[key].forEach(obj => {
                        let addItFlag = 1;
                        for (let i = 0; i < target[key].length; i++) {
                            if (deepEqualOld(target[key][i], obj)) {
                                addItFlag = 0;
                                break;
                            }
                        }
                        if (addItFlag) {
                            target[key].push(obj);
                        }
                    });
                }
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeepOld(target, ...sources);
}
