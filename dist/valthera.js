import ky from "ky";
import serializeFunctions from "./function.js";
import { version } from "./version.js";
import CollectionManager from "@wxn0brp/db-core/helpers/CollectionManager";
/**
 * Represents a database management class for performing CRUD operations.
 * Uses a remote database.
 * @class
 */
class ValtheraRemote {
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
        const res = await ky.post(url, {
            json: data,
            headers: {
                "Authorization": this.remote.auth
            },
            throwHttpErrors: false
        }).json();
        if (res.err)
            throw new Error(res.msg);
        return res.result;
    }
    /**
     * Create a new instance of a CollectionManager class.
     */
    c(collection) {
        return new CollectionManager(this, collection);
    }
    /**
     * Get the names of all available databases.
     */
    async getCollections() {
        return await this._request("getCollections", []);
    }
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    async checkCollection(collection) {
        return await this._request("checkCollection", [collection]);
    }
    /**
     * Check if a collection exists.
     */
    async issetCollection(collection) {
        return await this._request("issetCollection", [collection]);
    }
    /**
     * Add data to a database.
     */
    async add(collection, data, id_gen = true) {
        return await this._request("add", [collection, data, id_gen]);
    }
    /**
     * Find data in a database.
     */
    async find(collection, search, context = {}, options = {}, findOpts = {}) {
        return await this._request("find", [collection, search, context, options, findOpts]);
    }
    /**
     * Find one data entry in a database.
     */
    async findOne(collection, search, context = {}, findOpts = {}) {
        return await this._request("findOne", [collection, search, context, findOpts]);
    }
    /**
     * Update data in a database.
     */
    async update(collection, search, updater, context = {}) {
        return await this._request("update", [collection, search, updater, context]);
    }
    /**
     * Update one data entry in a database.
     */
    async updateOne(collection, search, updater, context = {}) {
        return await this._request("updateOne", [collection, search, updater, context]);
    }
    /**
     * Remove data from a database.
     */
    async remove(collection, search, context = {}) {
        return await this._request("remove", [collection, search, context]);
    }
    /**
     * Remove one data entry from a database.
     */
    async removeOne(collection, search, context = {}) {
        return await this._request("removeOne", [collection, search, context]);
    }
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    async updateOneOrAdd(collection, search, arg, add_arg = {}, context = {}, id_gen = true) {
        return await this._request("updateOneOrAdd", [collection, search, arg, add_arg, context, id_gen]);
    }
    /**
     * Removes a database collection from the file system.
     */
    async removeCollection(name) {
        return await this._request("removeCollection", [name]);
    }
}
export default ValtheraRemote;
