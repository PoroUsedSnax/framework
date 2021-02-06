"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
require("../lib/errors/Identifiers");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'date' });
    }
    run(parameter, context) {
        const parsed = new Date(parameter);
        const time = parsed.getTime();
        if (Number.isNaN(time)) {
            return this.error({
                parameter,
                message: 'The argument did not resolve to a valid date.',
                context
            });
        }
        if (typeof context.minimum === 'number' && time < context.minimum) {
            return this.error({ parameter, identifier: "dateTooSmall" /* ArgumentDateTooSmall */, message: 'The argument is too small.', context });
        }
        if (typeof context.maximum === 'number' && time > context.maximum) {
            return this.error({ parameter, identifier: "dateTooBig" /* ArgumentDateTooBig */, message: 'The argument is too big.', context });
        }
        return this.ok(parsed);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreDate.js.map