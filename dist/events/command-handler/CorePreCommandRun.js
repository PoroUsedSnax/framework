"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.PreCommandRun });
    }
    async run(payload) {
        const { message, command } = payload;
        // Run global preconditions:
        const globalResult = await this.context.stores.get('preconditions').run(message, command, payload);
        if (!globalResult.success) {
            message.client.emit(Events_1.Events.CommandDenied, globalResult.error, payload);
            return;
        }
        // Run command-specific preconditions:
        const localResult = await command.preconditions.run(message, command, payload);
        if (!localResult.success) {
            message.client.emit(Events_1.Events.CommandDenied, localResult.error, payload);
            return;
        }
        message.client.emit(Events_1.Events.CommandAccepted, payload);
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CorePreCommandRun.js.map