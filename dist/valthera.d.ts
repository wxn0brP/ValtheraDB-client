import { Collection } from "@wxn0brp/db-core/helpers/collection";
import { Data } from "@wxn0brp/db-core/types/data";
import { AddQuery, FindOneQuery, FindQuery, RemoveQuery, ToggleOneQuery, UpdateOneOrAddQuery, UpdateQuery, ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
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
    c(collection: string): Collection<Data>;
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
    add<T = Data>(query: AddQuery): Promise<T>;
    /**
     * Find data in a database.
     */
    find<T = Data>(query: FindQuery): Promise<T[]>;
    /**
     * Find one data entry in a database.
     */
    findOne<T = Data>(query: FindOneQuery): Promise<T>;
    /**
     * Update data in a database.
     */
    update<T = Data>(query: UpdateQuery): Promise<T[]>;
    /**
     * Update one data entry in a database.
     */
    updateOne<T = Data>(query: UpdateQuery): Promise<T>;
    /**
     * Remove data from a database.
     */
    remove<T = Data>(query: RemoveQuery): Promise<T[]>;
    /**
     * Remove one data entry from a database.
     */
    removeOne<T = Data>(query: RemoveQuery): Promise<T>;
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    updateOneOrAdd<T = Data>(query: UpdateOneOrAddQuery): Promise<T>;
    /**
     * Asynchronously removes one entry in a database or adds a new one if it doesn't exist. Usage e.g. for toggling a flag.
     */
    toggleOne<T = Data>(query: ToggleOneQuery): Promise<T>;
    /**
     * Removes a database collection from the file system.
     */
    removeCollection(name: string): Promise<boolean>;
}
export default ValtheraRemote;
