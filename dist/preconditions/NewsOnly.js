"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorePrecondition = void 0;
require("../lib/errors/Identifiers");
const Precondition_1 = require("../lib/structures/Precondition");
class CorePrecondition extends Precondition_1.Precondition {
    run(message) {
        return message.channel.type === 'news'
            ? this.error({ identifier: "preconditionNewsOnly" /* PreconditionNewsOnly */, message: 'You can only run this command in news channels.' })
            : this.ok();
    }
}
exports.CorePrecondition = CorePrecondition;
//# sourceMappingURL=NewsOnly.js.map