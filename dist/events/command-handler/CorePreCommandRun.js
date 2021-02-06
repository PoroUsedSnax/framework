"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
require("../../lib/errors/Identifiers");
const UserError_1 = require("../../lib/errors/UserError");
const Result_1 = require("../../lib/parsers/Result");
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.PreCommandRun });
    }
    async run(payload) {
        const { message, command } = payload;
        if (!command.enabled) {
            message.client.emit(Events_1.Events.CommandDenied, new UserError_1.UserError({ identifier: "commandDisabled" /* CommandDisabled */, message: 'This command is disabled.', context: payload }), payload);
            return;
        }
        const result = await command.preconditions.run(message, command, { command });
        if (Result_1.isErr(result)) {
            message.client.emit(Events_1.Events.CommandDenied, result.error, payload);
        }
        else {
            message.client.emit(Events_1.Events.CommandAccepted, payload);
        }
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CorePreCommandRun.js.map