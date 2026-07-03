import { Remote, RemoteConfig } from "./remote.js";
export declare class BaseRemote {
    remote: Remote;
    version: string;
    constructor(remote: string | RemoteConfig);
    _request<T>(type: string, query?: any): Promise<T>;
}
