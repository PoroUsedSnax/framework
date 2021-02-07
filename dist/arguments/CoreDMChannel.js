"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_js_utilities_1 = require("@sapphire/discord.js-utilities");
const ExtendedArgument_1 = require("../lib/structures/ExtendedArgument");
class CoreArgument extends ExtendedArgument_1.ExtendedArgument {
    constructor(context) {
        super(context, { baseArgument: 'channel', name: 'dmChannel' });
    }
    handle(channel, context) {
        return discord_js_utilities_1.isDMChannel(channel)
            ? this.ok(channel)
            : this.error({
                parameter: context.parameter,
                message: 'The argument did not resolve to a DM channel.',
                context: { ...context, channel }
            });
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreDMChannel.js.map