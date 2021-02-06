"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_utilities_1 = require("@sapphire/discord-utilities");
require("../lib/errors/Identifiers");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'guildChannel' });
    }
    run(parameter, context) {
        var _a;
        const { guild } = context.message;
        if (!guild) {
            return this.error({
                parameter,
                identifier: "guildChannelMissingGuild" /* ArgumentGuildChannelMissingGuild */,
                message: 'The argument must be run in a guild.',
                context
            });
        }
        const channel = (_a = this.resolveByID(parameter, guild)) !== null && _a !== void 0 ? _a : this.resolveByQuery(parameter, guild);
        return channel ? this.ok(channel) : this.error({ parameter, message: 'The argument did not resolve to a guild channel.', context });
    }
    resolveByID(argument, guild) {
        var _a, _b;
        const channelID = (_a = discord_utilities_1.ChannelMentionRegex.exec(argument)) !== null && _a !== void 0 ? _a : discord_utilities_1.SnowflakeRegex.exec(argument);
        return channelID ? (_b = guild.channels.cache.get(channelID[1])) !== null && _b !== void 0 ? _b : null : null;
    }
    resolveByQuery(argument, guild) {
        var _a;
        const lowerCaseArgument = argument.toLowerCase();
        return (_a = guild.channels.cache.find((channel) => channel.name.toLowerCase() === lowerCaseArgument)) !== null && _a !== void 0 ? _a : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreGuildChannel.js.map