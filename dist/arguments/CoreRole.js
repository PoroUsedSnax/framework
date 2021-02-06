"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_utilities_1 = require("@sapphire/discord-utilities");
require("../lib/errors/Identifiers");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'role' });
    }
    async run(parameter, context) {
        var _a;
        const { guild } = context.message;
        if (!guild) {
            return this.error({
                parameter,
                identifier: "roleMissingGuild" /* ArgumentRoleMissingGuild */,
                message: 'The argument must be run on a guild.',
                context
            });
        }
        const role = (_a = (await this.resolveByID(parameter, guild))) !== null && _a !== void 0 ? _a : this.resolveByQuery(parameter, guild);
        return role ? this.ok(role) : this.error({ parameter, message: 'The argument did not resolve to a role.', context });
    }
    async resolveByID(argument, guild) {
        var _a;
        const roleID = (_a = discord_utilities_1.RoleMentionRegex.exec(argument)) !== null && _a !== void 0 ? _a : discord_utilities_1.SnowflakeRegex.exec(argument);
        return roleID ? guild.roles.fetch(roleID[1]).catch(() => null) : null;
    }
    resolveByQuery(argument, guild) {
        var _a;
        const lowerCaseArgument = argument.toLowerCase();
        return (_a = guild.roles.cache.find((role) => role.name.toLowerCase() === lowerCaseArgument)) !== null && _a !== void 0 ? _a : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreRole.js.map