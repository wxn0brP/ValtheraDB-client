import { RelationTypes } from "@wxn0brp/db-core";
import { Search } from "@wxn0brp/db-core/types/arg";
import { DbFindOpts } from "@wxn0brp/db-core/types/options";
import { Remote } from "./remote.js";
export declare class RelationClient {
    dbs: Record<string, string | Remote>;
    constructor(dbs: Record<string, string | Remote>);
    _request(type: "findOne" | "find", params: any[]): Promise<any>;
    find(path: RelationTypes.Path, search: Search, relations: RelationTypes.Relation, select?: string[][] | Record<string, any>, dbFindOpts?: DbFindOpts): Promise<any[]>;
    findOne(path: RelationTypes.Path, search: Search, relations: RelationTypes.Relation, select?: string[][] | Record<string, any>): Promise<any>;
}
