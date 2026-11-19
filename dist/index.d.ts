import { RemoteActionsBase } from "./actions.js";
import { RemoteConfig } from "./remote.js";
export * from "./actions.js";
export * from "./function.js";
export * from "./regex.js";
export * from "./remote.js";
export * from "./undefined.js";
export * from "./valthera.js";
export declare const DYNAMIC: {
    def(url: string | RemoteConfig): RemoteActionsBase;
};
