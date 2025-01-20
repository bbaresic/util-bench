export const isArray = Array.isArray.bind(Array);
export const tObject = "Object";
export const toString = Object.prototype.toString;

export function isA(object, _t) {
    return toString.call(object) === `[object ${_t}]`;
}

export function isPlainObject(object) {
    return isA(object, tObject);
}