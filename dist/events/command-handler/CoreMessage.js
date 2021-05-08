"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.Message });
    }
    run(message) {
        // Stop bots and webhooks from running commands.
        if (message.author.bot || message.webhookID)
            return;
        // Run the message parser.
        this.container.client.emit(Events_1.Events.PreMessageParsed, message);
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CoreMessage.js.map