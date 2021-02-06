"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
require("../lib/errors/Identifiers");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'integer' });
    }
    run(parameter, context) {
        const parsed = Number(parameter);
        if (!Number.isInteger(parsed)) {
            return this.error({
                parameter,
                message: 'The argument did not resolve to an integer.',
                context
            });
        }
        if (typeof context.minimum === 'number' && parsed < context.minimum) {
            return this.error({
                parameter,
                identifier: "integerTooSmall" /* ArgumentIntegerTooSmall */,
                message: `The argument must be greater than ${context.minimum}.`,
                context
            });
        }
        if (typeof context.maximum === 'number' && parsed > context.maximum) {
            return this.error({
                parameter,
                identifier: "integerTooBig" /* ArgumentIntegerTooBig */,
                message: `The argument must be less than ${context.maximum}.`,
                context
            });
        }
        return this.ok(parsed);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreInteger.js.map