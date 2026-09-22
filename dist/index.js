import { RemoteActionsBase } from "./actions.js";
export * from "./actions.js";
export * from "./function.js";
export * from "./remote.js";
export * from "./valthera.js";
export const DYNAMIC = {
    client(url) {
        return new RemoteActionsBase(url);
    },
};
