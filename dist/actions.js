import { BaseRemote } from "./base.js";
export class RemoteActionsBase extends BaseRemote {
    _inited = true;
    numberId = false;
    smartExecutor = true;
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
}
