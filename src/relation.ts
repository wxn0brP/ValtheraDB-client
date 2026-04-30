import { RelationTypes } from "@wxn0brp/db-core";
import { Search } from "@wxn0brp/db-core/types/arg";
import { DbFindOpts } from "@wxn0brp/db-core/types/options";
import { parseRemote } from "./parse";
import { Remote } from "./remote";

export class RelationClient {
    constructor(public dbs: Record<string, string | Remote>) { }

    async _request(type: "findOne" | "find", params: any[]) {
        const dbName = params[0][0];
        const parsed = parseRemote(this.dbs[dbName]);

        const config: Record<string, Remote> = {};
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

        const data = await response.json() as { err: boolean, msg: string, result: any };
        if (data.err)
            throw new Error(data.msg || "Unknown error from relation API");

        return data.result;
    }

    async find(
        path: RelationTypes.Path,
        search: Search,
        relations: RelationTypes.Relation,
        select?: string[][] | Record<string, any>,
        dbFindOpts: DbFindOpts = {}
    ): Promise<any[]> {
        return await this._request("find", [path, search, relations, select, dbFindOpts]);
    }

    async findOne(
        path: RelationTypes.Path,
        search: Search,
        relations: RelationTypes.Relation,
        select?: string[][] | Record<string, any>
    ): Promise<any> {
        return await this._request("findOne", [path, search, relations, select]);
    }
}
