import { serializeFunctions } from "./function.js";
import { parseRemote } from "./parse.js";
import { version } from "./version.js";
export class BaseRemote {
    remote;
    version = version;
    constructor(remote) {
        this.remote = parseRemote(remote);
    }
    async _request(type, query) {
        const processed = serializeFunctions(query);
        const url = new URL(this.remote.url);
        const data = {
            auth: url.username,
            db: url.password,
            query: processed.data,
            keys: processed.keys,
            ...(this.remote.body || {}),
        };
        url.pathname = url.pathname.replace(/\/$/, "") + "/db/" + type;
        const res = (await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(this.remote.headers || {}),
            },
            body: JSON.stringify(data),
            ...(this.remote.fetch || {}),
        }).then(res => res.json()));
        if (res.err)
            throw new Error(res.msg);
        return res.result;
    }
}
