"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRegistry = void 0;
const collection_1 = __importDefault(require("@discordjs/collection"));
const pieces_1 = require("@sapphire/pieces");
const path_1 = require("path");
/**
 * A strict-typed store registry. This is available in both [[Client.stores]] and [[Store.injectedContext]].
 * @since 1.0.0
 * @example
 * ```typescript
 * // Adding new stores
 *
 * // Register the store:
 * Store.injectedContext.stores.register(new RouteStore());
 *
 * // Augment Sapphire to add the new store, in case of a JavaScript
 * // project, this can be moved to an `Augments.d.ts` (or any other name)
 * // file somewhere:
 * declare module '(at)sapphire/framework' {
 *   export interface StoreRegistryEntries {
 *     routes: RouteStore;
 *   }
 * }
 * ```
 */
class StoreRegistry extends collection_1.default {
    /**
     * Registers all user directories from the process working directory, the default value is obtained by assuming
     * CommonJS (high accuracy) but with fallback for ECMAScript Modules (reads package.json's `main` entry, fallbacks
     * to `process.cwd()`).
     *
     * By default, if you have this folder structure:
     * ```
     * /home/me/my-bot
     * ├─ src
     * │  ├─ commands
     * │  ├─ events
     * │  └─ main.js
     * └─ package.json
     * ```
     *
     * And you run `node src/main.js`, the directories `/home/me/my-bot/src/commands` and `/home/me/my-bot/src/events` will
     * be registered for the commands and events stores respectively, since both directories are located in the same
     * directory as your main file.
     *
     * **Note**: this also registers directories for all other stores, even if they don't have a folder, this allows you
     * to create new pieces and hot-load them later anytime.
     * @since 1.0.0
     * @param rootDirectory The root directory to register pieces at.
     */
    registerUserDirectories(rootDirectory = pieces_1.getRootData().root) {
        for (const store of this.values()) {
            store.registerPath(path_1.join(rootDirectory, store.name));
        }
    }
    /**
     * Registers a store.
     * @since 1.0.0
     * @param store The store to register.
     */
    register(store) {
        this.set(store.name, store);
        return this;
    }
    /**
     * Deregisters a store.
     * @since 1.0.0
     * @param store The store to deregister.
     */
    deregister(store) {
        this.delete(store.name);
        return this;
    }
}
exports.StoreRegistry = StoreRegistry;
//# sourceMappingURL=StoreRegistry.js.map