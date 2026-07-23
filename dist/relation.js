import { parseRemote } from "./parse.js";
export class RelationClient {
    remote = {};
    constructor(remote) {
        this.remote = Object.fromEntries(Object.entries(remote).map(([name, remote]) => [
            name,
            parseRemote(remote),
        ]));
    }
    async _request(type, params) {
        const dbName = params[0][0];
        const entry = this.remote[dbName];
        const url = new URL(entry.url);
        const config = {};
        Object.entries(this.remote).forEach(([name, remote]) => {
            config[name] = remote.url.toString();
        });
        if (typeof params[1] === "function")
            params[1] = params[1].toString();
        url.pathname = url.pathname + "/r/" + type;
        const body = {
            accessCfg: config,
            params: params,
            auth: url.username,
        };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(entry.headers || {}),
            },
            body: JSON.stringify(body),
            ...(entry.fetch || {}),
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }
        const data = (await response.json());
        if (data.err)
            throw new Error(data.msg || "Unknown error from relation API");
        return data.result;
    }
    async find(path, search, relations, select, dbFindOpts = {}) {
        return await this._request("find", [
            path,
            search,
            relations,
            select,
            dbFindOpts,
        ]);
    }
    async findOne(path, search, relations, select) {
        return await this._request("findOne", [
            path,
            search,
            relations,
            select,
        ]);
    }
}
