"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
const truths = ['1', 'true', '+', 't', 'yes', 'y'];
const falses = ['0', 'false', '-', 'f', 'no', 'n'];
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'boolean' });
    }
    run(parameter, context) {
        const boolean = parameter.toLowerCase();
        if (truths.includes(boolean))
            return this.ok(true);
        if (falses.includes(boolean))
            return this.ok(false);
        return this.error({ parameter, message: 'The argument did not resolve to a boolean.', context });
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreBoolean.js.map