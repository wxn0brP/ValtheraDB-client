import CollectionManager from "@wxn0brp/db-core/helpers/CollectionManager";
import { Arg, Search, Updater } from "@wxn0brp/db-core/types/arg";
import Data from "@wxn0brp/db-core/types/data";
import { DbFindOpts, FindOpts } from "@wxn0brp/db-core/types/options";
import { VContext } from "@wxn0brp/db-core/types/types";
import { UpdateOneOrAdd, ValtheraCompatible } from "@wxn0brp/db-core/types/valthera";
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
    c(collection: string): CollectionManager<Data>;
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
    add<T = Data>(collection: string, data: Arg<T>, id_gen?: boolean): Promise<T>;
    /**
     * Find data in a database.
     */
    find<T = Data>(collection: string, search: Search<T>, options?: DbFindOpts<T>, findOpts?: FindOpts<T>, context?: VContext): Promise<T[]>;
    /**
     * Find one data entry in a database.
     */
    findOne<T = Data>(collection: string, search: Search<T>, findOpts?: FindOpts<T>, context?: VContext): Promise<T>;
    /**
     * Update data in a database.
     */
    update<T = Data>(collection: string, search: Search<T>, updater: Updater<T>, context?: VContext): Promise<boolean>;
    /**
     * Update one data entry in a database.
     */
    updateOne<T = Data>(collection: string, search: Search<T>, updater: Updater<T>, context?: VContext): Promise<boolean>;
    /**
     * Remove data from a database.
     */
    remove<T = Data>(collection: string, search: Search<T>, context?: VContext): Promise<boolean>;
    /**
     * Remove one data entry from a database.
     */
    removeOne<T = Data>(collection: string, search: Search<T>, context?: VContext): Promise<boolean>;
    /**
     * Asynchronously updates one entry in a database or adds a new one if it doesn't exist.
     */
    updateOneOrAdd<T = Data>(collection: string, search: Search<T>, arg: Search<T>, opts: UpdateOneOrAdd<T>): Promise<boolean>;
    /**
     * Asynchronously removes one entry in a database or adds a new one if it doesn't exist. Usage e.g. for toggling a flag.
     */
    toggleOne<T = Data>(collection: string, search: Search<T>, data: Arg<T>, context?: VContext): Promise<boolean>;
    /**
     * Removes a database collection from the file system.
     */
    removeCollection(name: string): Promise<boolean>;
}
export default ValtheraRemote;
