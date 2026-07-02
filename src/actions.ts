import { ActionsBaseInterface } from "@wxn0brp/db-core/types/action";
import { DataInternal } from "@wxn0brp/db-core/types/data";
import { VQueryT } from "@wxn0brp/db-core/types/query";
import { BaseRemote } from "./base";

export class RemoteActionsBase extends BaseRemote implements ActionsBaseInterface {
    _inited: boolean = true;
    numberId: boolean = false;
    smartExecutor: boolean = true;

    async init(...args: any[]) { }
    async close(...args: any[]) { }

    async getCollections() {
        return this._request<string[]>("getCollections");
    }

    async ensureCollection(collection: string) {
        return this._request<boolean>("ensureCollection", collection);
    }

    async issetCollection(collection: string) {
        return this._request<boolean>("issetCollection", collection);
    }

    async removeCollection(collection: string) {
        return this._request<boolean>("removeCollection", collection);
    }

    async add(config: VQueryT.Add) {
        return this._request<DataInternal>("add", config);
    }

    async find(config: VQueryT.Find) {
        return this._request<DataInternal[]>("find", config);
    }

    async findOne(config: VQueryT.FindOne) {
        return this._request<DataInternal | null>("findOne", config);
    }

    async update(config: VQueryT.Update) {
        return this._request<DataInternal[]>("update", config);
    }

    async updateOne(config: VQueryT.Update) {
        return this._request<DataInternal | null>("updateOne", config);
    }

    async remove(config: VQueryT.Remove) {
        return this._request<DataInternal[]>("remove", config);
    }

    async removeOne(config: VQueryT.Remove) {
        return this._request<DataInternal | null>("removeOne", config);
    }

    async updateOneOrAdd(config: VQueryT.UpdateOneOrAdd) {
        return this._request<VQueryT.UpdateOneOrAddResult<DataInternal>>("updateOneOrAdd", config);
    }

    async toggleOne(config: VQueryT.ToggleOne) {
        return this._request<VQueryT.ToggleOneResult<DataInternal>>("toggleOne", config);
    }
}
