"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_js_utilities_1 = require("@sapphire/discord.js-utilities");
const discord_js_1 = require("discord.js");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'message' });
    }
    async run(parameter, context) {
        var _a, _b;
        const channel = (_a = context.channel) !== null && _a !== void 0 ? _a : context.message.channel;
        const message = (_b = (await this.resolveByID(parameter, channel))) !== null && _b !== void 0 ? _b : (await this.resolveByLink(parameter, context));
        return message
            ? this.ok(message)
            : this.error({
                parameter,
                message: 'The argument did not resolve to a message.',
                context: { ...context, channel }
            });
    }
    async resolveByID(argument, channel) {
        return discord_js_utilities_1.SnowflakeRegex.test(argument) ? channel.messages.fetch(argument).catch(() => null) : null;
    }
    async resolveByLink(argument, { message }) {
        var _a;
        if (!message.guild)
            return null;
        const matches = discord_js_utilities_1.MessageLinkRegex.exec(argument);
        if (!matches)
            return null;
        const [, guildID, channelID, messageID] = matches;
        const guild = this.context.client.guilds.cache.get(guildID);
        if (guild !== message.guild)
            return null;
        const channel = guild.channels.cache.get(channelID);
        if (!channel)
            return null;
        if (!(discord_js_utilities_1.isNewsChannel(channel) || discord_js_utilities_1.isTextChannel(channel)))
            return null;
        if (!channel.viewable)
            return null;
        if (!((_a = channel.permissionsFor(message.author)) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.Permissions.FLAGS.VIEW_CHANNEL)))
            return null;
        return channel.messages.fetch(messageID).catch(() => null);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreMessage.js.map