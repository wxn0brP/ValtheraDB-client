import { UnsupportedOperationError } from "@wxn0brp/db-core/errors";
import { BaseRemote } from "./base.js";
export class RemoteActionsBase extends BaseRemote {
    _inited = true;
    // TODO: client don't send adapterOpts to server
    adapterOpts;
    smartExecutor = true;
    capabilities = {
        transactions: false,
        indexes: false,
        persistent: true,
    };
    async init(...args) { }
    async close(...args) { }
    async getCollections() {
        return this._request("getCollections");
    }
    async ensureCollection(collection) {
        return this._request("ensureCollection", collection);
    }
    async issetCollection(collection) {
        return this._request("issetCollection", collection);
    }
    async removeCollection(collection) {
        return this._request("removeCollection", collection);
    }
    async add(config) {
        return this._request("add", config);
    }
    async find(config) {
        return this._request("find", config);
    }
    async findOne(config) {
        return this._request("findOne", config);
    }
    async update(config) {
        return this._request("update", config);
    }
    async updateOne(config) {
        return this._request("updateOne", config);
    }
    async remove(config) {
        return this._request("remove", config);
    }
    async removeOne(config) {
        return this._request("removeOne", config);
    }
    async updateOneOrAdd(config) {
        return this._request("updateOneOrAdd", config);
    }
    async toggleOne(config) {
        return this._request("toggleOne", config);
    }
    async beginTransaction(id) {
        throw new UnsupportedOperationError("beginTransaction");
    }
    async commitTransaction(handle) {
        throw new UnsupportedOperationError("commitTransaction");
    }
    async rollbackTransaction(handle) {
        throw new UnsupportedOperationError("rollbackTransaction");
    }
    async createIndex(config) { }
    async removeIndex(config) { }
    async count(config) {
        return this._request("count", config);
    }
    async bulkAdd(config) {
        return this._request("bulkAdd", config);
    }
}
