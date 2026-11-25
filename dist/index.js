import { RemoteActionsBase } from "./adapter.js";
export * from "./adapter.js";
export * from "./regex.js";
export * from "./remote.js";
export * from "./undefined.js";
export * from "./valthera.js";
export const DYNAMIC = {
    def(url) {
        return new RemoteActionsBase(url);
    },
};
