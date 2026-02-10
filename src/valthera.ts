import { Collection } from "@wxn0brp/db-core/helpers/collection";
import { Data } from "@wxn0brp/db-core/types/data";
import {
    AddQuery,
    FindOneQuery,
    FindQuery,
    RemoveQuery,
    ToggleOneQuery,
    UpdateOneOrAddQuery,
    UpdateQuery,
    ValtheraCompatible
} from "@wxn0brp/db-core/types/valthera";
import { serializeFunctions } from "./function";
import { Remote, RequestData } from "./remote";
import { version } from "./version";

/**
 * Represents a database management class for performing CRUD operations.
 * Uses a remote database.
 * @class
 */
export class ValtheraRemote implements ValtheraCompatible {
    remote: Remote;
    version = version;

    constructor(remote: Remote | string) {
        if (typeof remote === "string") {
            const urlObj = new URL(remote);
            const name = urlObj.username;
            const auth = urlObj.password;
            if (!name || !auth) throw new Error("Invalid remote database");

            urlObj.username = "";
            urlObj.password = "";
            const url = urlObj.toString().slice(0, -1);

            this.remote = {
                name,
                url,
                auth
            };
        } else this.remote = remote;
        if (this.remote.url.endsWith("/")) this.remote.url = this.remote.url.slice(0, -1);
    }

    /**
     * Make a request to the remote database.
     */
    async _request<T>(type: string, params = []) {
        const processed = serializeFunctions(params);
        const data: RequestData = {
            db: this.remote.name,
            params: processed.data,
            keys: processed.keys
        };
        const url = this.remote.url + "/db/" + type;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.remote.auth
            },
            body: JSON.stringify(data)
        }).then(res => res.json()) as { err: boolean, msg: string, result: any };

        if (res.err) throw new Error(res.msg);
        return res.result as T;
    }

    /**
     * Create a new instance of a CollectionManager class.
     */
    c(collection: string) {
        return new Collection(this, collection);
    }

    /**
     * Get the names of all available databases.
     */
    getCollections() {
        return this._request<string[]>("getCollections", []);
    }

    /**
     * Check and create the specified collection if it doesn't exist.
     */
    ensureCollection(collection: string) {
        return this._request<boolean>("ensureCollection", [collection]);
    }

    /**
     * Check if a collection exists.
     */
    issetCollection(collection: string) {
        return this._request<boolean>("issetCollection", [collection]);
    }

    /**
     * Add data to a database.
     */
    add<T = Data>(query: AddQuery) {
        return this._request<T>("add", [query]);
    }

    /**
     * Find data in a database.
     */
    find<T = Data>(query: FindQuery) {
        return this._request<T[]>("find", [query]);
    }

    /**
     * Find one data entry in a database.
     */
    findOne<T = Data>(query: FindOneQuery) {
        return this._request<T | null>("findOne", [query]);
    }

    /**
     * Update data in a database.
     */
    update<T = Data>(query: UpdateQuery) {
        return this._request<T[]>("update", [query]);
    }

    /**
     * Update one data entry in a database.
     */
    updateOne<T = Data>(query: UpdateQuery) {
        return this._request<T | null>("updateOne", [query]);
    }

    /**
     * Remove data from a database.
     */
    remove<T = Data>(query: RemoveQuery) {
        return this._request<T[]>("remove", [query]);
    }

    /**
     * Remove one data entry from a database.
     */
    removeOne<T = Data>(query: RemoveQuery) {
        return this._request<T | null>("removeOne", [query]);
    }

    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    updateOneOrAdd<T = Data>(query: UpdateOneOrAddQuery) {
        return this._request<T | null>("updateOneOrAdd", [query]);
    }

    /**
     * Asynchronously removes one entry in a database or adds a new one if it doesn't exist. Usage e.g. for toggling a flag.
     */
    toggleOne<T = Data>(query: ToggleOneQuery) {
        return this._request<T | null>("toggleOne", [query]);
    }

    /**
     * Removes a database collection from the file system.
     */
    removeCollection(name: string) {
        return this._request<boolean>("removeCollection", [name]);
    }
}
