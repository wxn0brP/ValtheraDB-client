import { Collection } from "@wxn0brp/db-core/helpers/collection";
import { Data } from "@wxn0brp/db-core/types/data";
import { VQueryT } from "@wxn0brp/db-core/types/query";
import { ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
import { serializeFunctions } from "./function";
import { parseRemote } from "./parse";
import { RemoteConfig, Remote, RequestData } from "./remote";
import { version } from "./version";

/**
 * Represents a database management class for performing CRUD operations.
 * Uses a remote database.
 */
export class ValtheraRemote implements ValtheraCompatible {
    remote: Remote;
    version = version;

    constructor(remote: RemoteConfig | string) {
        this.remote = parseRemote(remote);
    }

    /**
     * Make a request to the remote database.
     */
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

        url.pathname = url.pathname + "/db/" + type;

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

    /**
     * Create a new instance of a CollectionManager class.
     */
    c<T = Data>(collection: string) {
        return new Collection<T>(this, collection);
    }

    /**
     * Get the names of all available databases.
     */
    getCollections() {
        return this._request<string[]>("getCollections");
    }

    /**
     * Check and create the specified collection if it doesn't exist.
     */
    ensureCollection(collection: string) {
        return this._request<boolean>("ensureCollection", collection);
    }

    /**
     * Check if a collection exists.
     */
    issetCollection(collection: string) {
        return this._request<boolean>("issetCollection", collection);
    }

    /**
     * Add data to a database.
     */
    add<T = Data>(query: VQueryT.Add<T>) {
        return this._request<T>("add", query);
    }

    /**
     * Find data in a database.
     */
    find<T = Data>(query: VQueryT.Find<T>) {
        return this._request<T[]>("find", query);
    }

    /**
     * Find one data entry in a database.
     */
    findOne<T = Data>(query: VQueryT.FindOne<T>) {
        return this._request<T | null>("findOne", query);
    }

    /**
     * Update data in a database.
     */
    update<T = Data>(query: VQueryT.Update<T>) {
        return this._request<T[]>("update", query);
    }

    /**
     * Update one data entry in a database.
     */
    updateOne<T = Data>(query: VQueryT.Update<T>) {
        return this._request<T | null>("updateOne", query);
    }

    /**
     * Remove data from a database.
     */
    remove<T = Data>(query: VQueryT.Remove<T>) {
        return this._request<T[]>("remove", query);
    }

    /**
     * Remove one data entry from a database.
     */
    removeOne<T = Data>(query: VQueryT.Remove<T>) {
        return this._request<T | null>("removeOne", query);
    }

    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    updateOneOrAdd<T = Data>(query: VQueryT.UpdateOneOrAdd<T>) {
        return this._request<VQueryT.UpdateOneOrAddResult<T>>("updateOneOrAdd", query);
    }

    /**
     * Asynchronously removes one entry in a database or adds a new one if it doesn't exist. Usage e.g. for toggling a flag.
     */
    toggleOne<T = Data>(query: VQueryT.ToggleOne<T>) {
        return this._request<VQueryT.ToggleOneResult<T>>("toggleOne", query);
    }

    /**
     * Removes a database collection from the file system.
     */
    removeCollection(collection: string) {
        return this._request<boolean>("removeCollection", collection);
    }
}
