export function serializeFunctions(data) {
    const functionPaths = [];
    function serialize(obj, path = []) {
        for (const key of Object.keys(obj)) {
            const value = obj[key];
            const nextPath = [
                ...path,
                key,
            ];
            if (typeof value === "function") {
                functionPaths.push(nextPath);
                obj[key] = value.toString();
                continue;
            }
            if (value && typeof value === "object" && !Array.isArray(value))
                serialize(value, nextPath);
        }
    }
    serialize(data);
    return {
        data,
        keys: functionPaths,
    };
}
