import { VQueryT } from "@wxn0brp/db-core/types/query";
import { Remote, RemoteConfig } from "./remote.js";
export declare class BaseRemote {
    remote: Remote;
    version: string;
    constructor(remote: string | RemoteConfig);
    _find<T = any>(query: VQueryT.Find<T>): Promise<T[]>;
    _findOne<T = any>(query: VQueryT.FindOne<T>): Promise<T | null>;
    _request<T>(type: string, query?: any): Promise<T>;
}
