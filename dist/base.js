import { errorFromWire } from "@wxn0brp/db-core/errors";
import { updateFindObject } from "@wxn0brp/db-core/utils/updateFindObject";
import { serializeFunctions } from "./function.js";
import { parseRemote } from "./parse.js";
import { serializeRegex } from "./regex.js";
import { findUndefinedPaths } from "./undefined.js";
import { version } from "./version.js";
export class BaseRemote {
    remote;
    version = version;
    constructor(remote) {
        this.remote = parseRemote(remote);
    }
    async _find(query) {
        const findOpts = query.findOpts;
        if (typeof findOpts?.transform !== "function")
            return this._request("find", query);
        const remoteQuery = {
            ...query,
            findOpts: {},
        };
        const docs = await this._request("find", remoteQuery);
        return docs.map(doc => updateFindObject(doc, findOpts));
    }
    async _findOne(query) {
        const findOpts = query.findOpts;
        if (typeof findOpts?.transform !== "function")
            return this._request("findOne", query);
        const remoteQuery = {
            ...query,
            findOpts: {},
        };
        const doc = await this._request("findOne", remoteQuery);
        if (!doc)
            return null;
        return updateFindObject(doc, findOpts);
    }
    async _request(type, query) {
        const processed = serializeFunctions(query);
        const undefinedPaths = findUndefinedPaths(query);
        const url = new URL(this.remote.url);
        const payload = processed.data;
        const data = {
            db: url.username,
            auth: url.password,
            query: payload?.search
                ? {
                    ...payload,
                    search: serializeRegex(payload.search),
                }
                : payload,
            keys: processed.keys,
            undefinedPaths,
            ...(this.remote.body || {}),
        };
        url.pathname = url.pathname.replace(/\/$/, "") + "/db/" + type;
        url.username = "";
        url.password = "";
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
            throw errorFromWire({
                code: res.code,
                message: res.msg,
                suggestion: res.suggestion,
                context: res.context,
            });
        return res.result;
    }
}
