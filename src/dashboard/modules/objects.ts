export const objectKeysToArray = async (obj: Object) => {
    const ar = [];
    Object.keys(obj).forEach((key) => { ar.push(key) })
    return ar as Array<string>
};

export const arrayToObject = async (ar: Array<any>) => {
    const obj = {};
    ar.forEach(([key, value]) => {
        obj[key] = value
    })
    return obj
}