import { parseRemote } from "./parse.js";
export class RelationClient {
    dbs;
    constructor(dbs) {
        this.dbs = dbs;
    }
    async _request(type, params) {
        const dbName = params[0][0];
        const parsed = parseRemote(this.dbs[dbName]);
        const config = {};
        Object.entries(this.dbs).forEach(([name, remote]) => {
            config[name] = parseRemote(remote);
        });
        const url = `${parsed.url}/r/${type}`;
        const body = {
            accessCfg: this.dbs,
            params: params,
            auth: parsed.auth,
        };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }
        const data = await response.json();
        if (data.err)
            throw new Error(data.msg || "Unknown error from relation API");
        return data.result;
    }
    async find(path, search, relations, select, dbFindOpts = {}) {
        return await this._request("find", [path, search, relations, select, dbFindOpts]);
    }
    async findOne(path, search, relations, select) {
        return await this._request("findOne", [path, search, relations, select]);
    }
}
