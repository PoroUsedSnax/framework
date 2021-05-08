"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../lib/structures/Event");
const Events_1 = require("../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.Ready, once: true });
    }
    run() {
        var _a, _b, _c;
        var _d;
        (_a = (_d = this.container.client).id) !== null && _a !== void 0 ? _a : (_d.id = (_c = (_b = this.container.client.user) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : null);
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CoreReady.js.map