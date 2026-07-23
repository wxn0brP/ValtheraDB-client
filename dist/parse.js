export function parseRemote(remote) {
    const isString = typeof remote === "string";
    const url = new URL(isString ? remote : remote.url);
    url.pathname = url.pathname.replace(/\/$/, "");
    const parsed = {
        url,
    };
    if (!isString) {
        url.username = remote.name || url.username;
        url.password = remote.auth || url.password;
        Object.assign(url.searchParams, remote.query || {});
        if (remote.headers)
            parsed.headers = remote.headers;
        if (remote.fetch)
            parsed.fetch = remote.fetch;
        if (remote.body)
            parsed.body = remote.body;
    }
    return parsed;
}
