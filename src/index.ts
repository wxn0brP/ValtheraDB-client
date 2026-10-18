import { RemoteActionsBase } from "./actions";
import { RemoteConfig } from "./remote";

export * from "./actions";
export * from "./function";
export * from "./remote";
export * from "./valthera";

export const DYNAMIC = {
	def(url: string | RemoteConfig) {
		return new RemoteActionsBase(url);
	},
};
