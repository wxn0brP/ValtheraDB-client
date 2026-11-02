export function serializeFunctions(data) {
    if (!data)
        return {
            data,
            keys: [],
        };
    const functionPaths = [];
    function serialize(obj, path = []) {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            const nextPath = [
                ...path,
                key,
            ];
            if (typeof value === "function") {
                functionPaths.push(nextPath);
                result[key] = value.toString();
            }
            else if (value &&
                typeof value === "object" &&
                !Array.isArray(value) &&
                Object.getPrototypeOf(value) === Object.prototype) {
                result[key] = serialize(value, nextPath);
            }
            else {
                result[key] = value;
            }
        }
        return result;
    }
    return {
        data: serialize(data),
        keys: functionPaths,
    };
}
