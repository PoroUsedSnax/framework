"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.CommandAccepted });
    }
    async run({ message, command, parameters, context }) {
        const args = await command.preParse(message, parameters, context);
        try {
            message.client.emit(Events_1.Events.CommandRun, message, command);
            const result = await command.run(message, args, context);
            message.client.emit(Events_1.Events.CommandSuccess, { message, command, result, parameters });
        }
        catch (error) {
            message.client.emit(Events_1.Events.CommandError, error, { piece: command, message });
        }
        finally {
            message.client.emit(Events_1.Events.CommandFinish, message, command);
        }
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CoreCommandAccepted.js.map