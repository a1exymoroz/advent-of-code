// you need to implement a function that will stringify an object

const stringify = (obj) => {
    if (typeof obj === 'string') {
        return `"${obj}"`;
    }
    if (typeof obj === 'number') {
        return obj.toString();
    }
    if (typeof obj === 'boolean') {
        return obj.toString();
    }
    if (Array.isArray(obj)) {
        return `[${obj.map(item => stringify(item)).join(',')}]`;
    }
    if (typeof obj === 'object') {
        return `{${Object.keys(obj).map(key => `${key}:${stringify(obj[key])}`).join(',')}}`;
    }
    return '';
}

console.log(stringify([{a: 1, b: 2, c: [3, 4, 5]}, true, false, 'hello', 1, 2, 3, 4, 5, null]));