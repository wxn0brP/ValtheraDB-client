function isPlainObject(value) {
    return (!!value &&
        typeof value === "object" &&
        Object.getPrototypeOf(value) === Object.prototype);
}
export function findUndefinedPaths(data) {
    const updater = data?.updater;
    if (!isPlainObject(updater))
        return [];
    const undefinedPaths = [];
    function walk(obj, path) {
        for (const [key, value] of Object.entries(obj)) {
            const nextPath = [
                ...path,
                key,
            ];
            if (value === undefined)
                undefinedPaths.push(nextPath);
            else if (isPlainObject(value))
                walk(value, nextPath);
        }
    }
    walk(updater, [
        "updater",
    ]);
    return undefinedPaths;
}
