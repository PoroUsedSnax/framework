"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_utilities_1 = require("@sapphire/discord-utilities");
require("../lib/errors/Identifiers");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'member' });
    }
    async run(parameter, context) {
        var _a;
        const { guild } = context.message;
        if (!guild) {
            return this.error({
                parameter,
                identifier: "memberMissingGuild" /* ArgumentMemberMissingGuild */,
                message: 'The argument must be run on a guild.',
                context: { ...context, guild }
            });
        }
        const member = (_a = (await this.resolveByID(parameter, guild))) !== null && _a !== void 0 ? _a : (await this.resolveByQuery(parameter, guild));
        return member
            ? this.ok(member)
            : this.error({
                parameter,
                message: 'The argument did not resolve to a member.',
                context: { ...context, guild }
            });
    }
    async resolveByID(argument, guild) {
        var _a;
        const memberID = (_a = discord_utilities_1.UserOrMemberMentionRegex.exec(argument)) !== null && _a !== void 0 ? _a : discord_utilities_1.SnowflakeRegex.exec(argument);
        return memberID ? guild.members.fetch(memberID[1]).catch(() => null) : null;
    }
    async resolveByQuery(argument, guild) {
        var _a;
        const members = await guild.members
            .fetch({
            query: argument,
            limit: 1
        })
            .catch(() => null);
        return (_a = members === null || members === void 0 ? void 0 : members.first()) !== null && _a !== void 0 ? _a : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreMember.js.map