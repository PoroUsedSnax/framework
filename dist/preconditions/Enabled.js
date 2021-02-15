"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEssential = void 0;
require("../lib/errors/Identifiers");
const Precondition_1 = require("../lib/structures/Precondition");
class CoreEssential extends Precondition_1.Precondition {
    constructor(context) {
        super(context, { position: 10 });
    }
    run(_, command, context) {
        return command.enabled ? this.ok() : this.error({ identifier: "commandDisabled" /* CommandDisabled */, message: 'This command is disabled.', context });
    }
}
exports.CoreEssential = CoreEssential;
//# sourceMappingURL=Enabled.js.map