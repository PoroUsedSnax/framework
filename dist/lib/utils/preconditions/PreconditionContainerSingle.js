"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionContainerSingle = void 0;
const pieces_1 = require("@sapphire/pieces");
/**
 * An [[IPreconditionContainer]] which runs a single precondition from [[SapphireClient.preconditions]].
 * @since 1.0.0
 */
class PreconditionContainerSingle {
    constructor(data) {
        if (typeof data === 'string') {
            this.context = {};
            this.name = data;
        }
        else {
            this.context = data.context;
            this.name = data.name;
        }
    }
    /**
     * Runs the container.
     * @since 1.0.0
     * @param message The message that ran this precondition.
     * @param command The command the message invoked.
     */
    run(message, command) {
        const precondition = pieces_1.Store.injectedContext.stores.get('preconditions').get(this.name);
        if (precondition)
            return precondition.run(message, command, this.context);
        throw new Error(`The precondition "${this.name}" is not available.`);
    }
}
exports.PreconditionContainerSingle = PreconditionContainerSingle;
//# sourceMappingURL=PreconditionContainerSingle.js.map