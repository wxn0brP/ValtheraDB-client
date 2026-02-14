import { Collection } from "@wxn0brp/db-core/helpers/collection";
import { serializeFunctions } from "./function.js";
import { version } from "./version.js";
/**
 * Represents a database management class for performing CRUD operations.
 * Uses a remote database.
 * @class
 */
export class ValtheraRemote {
    remote;
    version = version;
    constructor(remote) {
        if (typeof remote === "string") {
            const urlObj = new URL(remote);
            const name = urlObj.username;
            const auth = urlObj.password;
            if (!name || !auth)
                throw new Error("Invalid remote database");
            urlObj.username = "";
            urlObj.password = "";
            const url = urlObj.toString().slice(0, -1);
            this.remote = {
                name,
                url,
                auth
            };
        }
        else
            this.remote = remote;
        if (this.remote.url.endsWith("/"))
            this.remote.url = this.remote.url.slice(0, -1);
    }
    /**
     * Make a request to the remote database.
     */
    async _request(type, params = []) {
        const processed = serializeFunctions(params);
        const data = {
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
        }).then(res => res.json());
        if (res.err)
            throw new Error(res.msg);
        return res.result;
    }
    /**
     * Create a new instance of a CollectionManager class.
     */
    c(collection) {
        return new Collection(this, collection);
    }
    /**
     * Get the names of all available databases.
     */
    getCollections() {
        return this._request("getCollections", []);
    }
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    ensureCollection(collection) {
        return this._request("ensureCollection", [collection]);
    }
    /**
     * Check if a collection exists.
     */
    issetCollection(collection) {
        return this._request("issetCollection", [collection]);
    }
    /**
     * Add data to a database.
     */
    add(query) {
        return this._request("add", [query]);
    }
    /**
     * Find data in a database.
     */
    find(query) {
        return this._request("find", [query]);
    }
    /**
     * Find one data entry in a database.
     */
    findOne(query) {
        return this._request("findOne", [query]);
    }
    /**
     * Update data in a database.
     */
    update(query) {
        return this._request("update", [query]);
    }
    /**
     * Update one data entry in a database.
     */
    updateOne(query) {
        return this._request("updateOne", [query]);
    }
    /**
     * Remove data from a database.
     */
    remove(query) {
        return this._request("remove", [query]);
    }
    /**
     * Remove one data entry from a database.
     */
    removeOne(query) {
        return this._request("removeOne", [query]);
    }
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    updateOneOrAdd(query) {
        return this._request("updateOneOrAdd", [query]);
    }
    /**
     * Asynchronously removes one entry in a database or adds a new one if it doesn't exist. Usage e.g. for toggling a flag.
     */
    toggleOne(query) {
        return this._request("toggleOne", [query]);
    }
    /**
     * Removes a database collection from the file system.
     */
    removeCollection(name) {
        return this._request("removeCollection", [name]);
    }
}
