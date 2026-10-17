import { BaseRemote } from "./base.js";
export class RemoteActionsBase extends BaseRemote {
    _inited = false;
    // TODO: client don't send adapterOpts to server
    adapterOpts;
    smartExecutor = true;
    capabilities = {
        transactions: false,
        indexes: false,
        persistent: true,
    };
    _capsLoaded = false;
    async init(...args) {
        if (this._capsLoaded)
            return;
        this._capsLoaded = true;
        try {
            const caps = await this._request("capabilities");
            if (caps)
                this.capabilities = caps;
        }
        catch { }
    }
    async close(...args) { }
    async getCollections() {
        return this._request("getCollections");
    }
    async ensureCollection(collection, tx) {
        return this._request("ensureCollection", {
            collection,
            transaction: tx,
        });
    }
    async issetCollection(collection, tx) {
        return this._request("issetCollection", {
            collection,
            transaction: tx,
        });
    }
    async removeCollection(collection, tx) {
        return this._request("removeCollection", {
            collection,
            transaction: tx,
        });
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
    async beginTransaction(_id, collections) {
        return this._request("beginTransaction", {
            collections,
        });
    }
    async commitTransaction(handle) {
        await this._request("commitTransaction", {
            transaction: handle,
        });
    }
    async rollbackTransaction(handle) {
        await this._request("rollbackTransaction", {
            transaction: handle,
        });
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
