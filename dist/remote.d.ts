import { FindOpts } from "@wxn0brp/db-core/types/options";
export interface Remote {
    name: string;
    url: string;
    auth: string;
}
export interface RequestData {
    db?: string;
    keys?: string[];
    params?: Record<string, any>;
}
export interface findOptsRemote<T = any> {
    select?: FindOpts<T>["select"];
    exclude?: FindOpts<T>["exclude"];
    transform?: string;
}
