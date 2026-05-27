export interface Remote {
    name: string;
    url: string;
    auth: string;
}

export interface RequestData {
    auth?: string;
    db?: string;
    keys?: string[][];
    query?: Record<string, any>;
}
