const LOGICAL_OPS = new Set([
    "$and",
    "$or",
    "$not",
]);
function setKey(target, key, value) {
    Object.defineProperty(target, key, {
        value,
        enumerable: true,
        writable: true,
        configurable: true,
    });
}
export function serializeRegex(search) {
    return mapSearch(search);
}
function mapSearch(search) {
    if (!search || typeof search !== "object" || Array.isArray(search))
        return search;
    const result = {};
    for (const key of Object.keys(search)) {
        const child = search[key];
        const op = key.toLowerCase();
        if (op === "$regex")
            setKey(result, key, mapPatterns(child));
        else if (LOGICAL_OPS.has(op))
            setKey(result, key, mapLogical(child));
        else
            setKey(result, key, child);
    }
    return result;
}
function mapLogical(value) {
    if (Array.isArray(value))
        return value.map(mapSearch);
    if (value && typeof value === "object")
        return mapSearch(value);
    return value;
}
function mapPatterns(patterns) {
    if (!patterns || typeof patterns !== "object" || Array.isArray(patterns))
        return patterns;
    const result = {};
    for (const field of Object.keys(patterns)) {
        const pattern = patterns[field];
        setKey(result, field, pattern instanceof RegExp
            ? {
                source: pattern.source,
                flags: pattern.flags,
            }
            : mapPatterns(pattern));
    }
    return result;
}
