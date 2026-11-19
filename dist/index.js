import { RemoteActionsBase } from "./actions.js";
export * from "./actions.js";
export * from "./function.js";
export * from "./regex.js";
export * from "./remote.js";
export * from "./undefined.js";
export * from "./valthera.js";
export const DYNAMIC = {
    def(url) {
        return new RemoteActionsBase(url);
    },
};
