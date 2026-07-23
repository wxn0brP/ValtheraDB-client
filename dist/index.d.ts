import { RemoteActionsBase } from "./actions.js";
import { RemoteConfig } from "./remote.js";
export * from "./actions.js";
export * from "./function.js";
export * from "./remote.js";
export * from "./valthera.js";
export declare const DYNAMIC: {
    client(url: string | RemoteConfig): RemoteActionsBase;
};
