import { ActionsBaseInterface } from "@wxn0brp/db-core/types/action";
import { DataInternal } from "@wxn0brp/db-core/types/data";
import { VQueryT } from "@wxn0brp/db-core/types/query";
import { BaseRemote } from "./base.js";
export declare class RemoteActionsBase extends BaseRemote implements ActionsBaseInterface {
    _inited: boolean;
    numberId: boolean;
    smartExecutor: boolean;
    init(...args: any[]): Promise<void>;
    close(...args: any[]): Promise<void>;
    getCollections(): Promise<string[]>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    removeCollection(collection: string): Promise<boolean>;
    add(config: VQueryT.Add): Promise<DataInternal>;
    find(config: VQueryT.Find): Promise<DataInternal[]>;
    findOne(config: VQueryT.FindOne): Promise<DataInternal>;
    update(config: VQueryT.Update): Promise<DataInternal[]>;
    updateOne(config: VQueryT.Update): Promise<DataInternal>;
    remove(config: VQueryT.Remove): Promise<DataInternal[]>;
    removeOne(config: VQueryT.Remove): Promise<DataInternal>;
    updateOneOrAdd(config: VQueryT.UpdateOneOrAdd): Promise<VQueryT.UpdateOneOrAddResult<DataInternal>>;
    toggleOne(config: VQueryT.ToggleOne): Promise<VQueryT.ToggleOneResult<DataInternal>>;
}
