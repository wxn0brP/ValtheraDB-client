import { serializeFunctions } from "./function";
import { parseRemote } from "./parse";
import { Remote, RemoteConfig, RequestData } from "./remote";
import { version } from "./version";

export class BaseRemote {
    remote: Remote;
    version = version;

    constructor(remote: string | RemoteConfig) {
        this.remote = parseRemote(remote);
    }

    async _request<T>(type: string, query?: any) {
        const processed = serializeFunctions(query);
        const url = new URL(this.remote.url);

        const data: RequestData = {
            auth: url.username,
            db: url.password,
            query: processed.data,
            keys: processed.keys,
            ...(this.remote.body || {})
        };

        url.pathname = url.pathname.replace(/\/$/, "") + "/db/" + type;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(this.remote.headers || {})
            },
            body: JSON.stringify(data),
            ...(this.remote.fetch || {})
        }).then(res => res.json()) as { err: boolean, msg: string, result: any };

        if (res.err) throw new Error(res.msg);
        return res.result as T;
    }
}
