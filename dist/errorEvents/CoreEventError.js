"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../lib/structures/Event");
const Events_1 = require("../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.EventError });
    }
    run(error, context) {
        const { name, event, path } = context.piece;
        this.context.logger.error(`Encountered error on event listener "${name}" for event "${event}" at path "${path}"`, error);
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CoreEventError.js.map