"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.CommandAccepted });
    }
    async run(payload) {
        const { message, command, parameters, context } = payload;
        const args = await command.preParse(message, parameters, context);
        try {
            message.client.emit(Events_1.Events.CommandRun, message, command, payload);
            const result = await command.run(message, args, context);
            message.client.emit(Events_1.Events.CommandSuccess, { ...payload, result });
        }
        catch (error) {
            message.client.emit(Events_1.Events.CommandError, error, { ...payload, piece: command });
        }
        finally {
            message.client.emit(Events_1.Events.CommandFinish, message, command, payload);
        }
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CoreCommandAccepted.js.map