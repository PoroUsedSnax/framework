"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'newsChannel' });
    }
    run(argument, context) {
        const channel = (context.message.guild ? context.message.guild.channels : this.client.channels).cache.get(argument);
        if (!channel) {
            return this.error(argument, 'ArgumentChannelMissingChannel', 'The argument did not resolve to a channel.');
        }
        if (channel.type !== 'news') {
            return this.error(argument, 'ArgumentNewsChannelInvalidChannel', 'The argument did not resolve to a news channel.');
        }
        return this.ok(channel);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreNewsChannel.js.map