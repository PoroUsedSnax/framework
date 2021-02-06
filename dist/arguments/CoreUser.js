"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_utilities_1 = require("@sapphire/discord-utilities");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'user' });
    }
    async run(parameter, context) {
        var _a;
        const userID = (_a = discord_utilities_1.UserOrMemberMentionRegex.exec(parameter)) !== null && _a !== void 0 ? _a : discord_utilities_1.SnowflakeRegex.exec(parameter);
        const user = userID ? await this.context.client.users.fetch(userID[1]).catch(() => null) : null;
        return user ? this.ok(user) : this.error({ parameter, message: 'The argument did not resolve to a user.', context });
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreUser.js.map