import { Data } from "@wxn0brp/db-core/types/data";
import { AddQuery, FindOneQuery, FindQuery, RemoveQuery, ToggleOneQuery, ToggleOneResult, UpdateOneOrAddQuery, UpdateOneOrAddResult, UpdateQuery } from "@wxn0brp/db-core/types/query";
import { ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
import { Remote } from "./remote.js";
/**
 * Represents a database management class for performing CRUD operations.
 * Uses a remote database.
 * @class
 */
export declare class ValtheraRemote implements ValtheraCompatible {
    remote: Remote;
    version: string;
    constructor(remote: Remote | string);
    /**
     * Make a request to the remote database.
     */
    _request<T>(type: string, params?: any[]): Promise<T>;
    /**
     * Create a new instance of a CollectionManager class.
     */
    c<T = Data>(collection: string): any;
    /**
     * Get the names of all available databases.
     */
    getCollections(): Promise<string[]>;
    /**
     * Check and create the specified collection if it doesn't exist.
     */
    ensureCollection(collection: string): Promise<boolean>;
    /**
     * Check if a collection exists.
     */
    issetCollection(collection: string): Promise<boolean>;
    /**
     * Add data to a database.
     */
    add<T = Data>(query: AddQuery<T>): Promise<T>;
    /**
     * Find data in a database.
     */
    find<T = Data>(query: FindQuery<T>): Promise<T[]>;
    /**
     * Find one data entry in a database.
     */
    findOne<T = Data>(query: FindOneQuery<T>): Promise<T>;
    /**
     * Update data in a database.
     */
    update<T = Data>(query: UpdateQuery<T>): Promise<T[]>;
    /**
     * Update one data entry in a database.
     */
    updateOne<T = Data>(query: UpdateQuery<T>): Promise<T>;
    /**
     * Remove data from a database.
     */
    remove<T = Data>(query: RemoveQuery<T>): Promise<T[]>;
    /**
     * Remove one data entry from a database.
     */
    removeOne<T = Data>(query: RemoveQuery<T>): Promise<T>;
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    updateOneOrAdd<T = Data>(query: UpdateOneOrAddQuery<T>): Promise<UpdateOneOrAddResult<T>>;
    /**
     * Asynchronously removes one entry in a database or adds a new one if it doesn't exist. Usage e.g. for toggling a flag.
     */
    toggleOne<T = Data>(query: ToggleOneQuery<T>): Promise<ToggleOneResult<T>>;
    /**
     * Removes a database collection from the file system.
     */
    removeCollection(name: string): Promise<boolean>;
}
