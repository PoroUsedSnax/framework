"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorePrecondition = void 0;
const discord_js_1 = require("discord.js");
require("../lib/errors/Identifiers");
const Precondition_1 = require("../lib/structures/Precondition");
class CorePrecondition extends Precondition_1.Precondition {
    constructor() {
        super(...arguments);
        this.dmChannelPermissions = new discord_js_1.Permissions([
            discord_js_1.Permissions.FLAGS.VIEW_CHANNEL,
            discord_js_1.Permissions.FLAGS.SEND_MESSAGES,
            discord_js_1.Permissions.FLAGS.SEND_TTS_MESSAGES,
            discord_js_1.Permissions.FLAGS.EMBED_LINKS,
            discord_js_1.Permissions.FLAGS.ATTACH_FILES,
            discord_js_1.Permissions.FLAGS.READ_MESSAGE_HISTORY,
            discord_js_1.Permissions.FLAGS.MENTION_EVERYONE,
            discord_js_1.Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
            discord_js_1.Permissions.FLAGS.ADD_REACTIONS
        ]).freeze();
    }
    run(message, _command, context) {
        var _a;
        const required = (_a = context.permissions) !== null && _a !== void 0 ? _a : new discord_js_1.Permissions(0);
        const permissions = message.guild
            ? message.channel.permissionsFor(message.client.id)
            : this.dmChannelPermissions;
        const missing = permissions.missing(required);
        return missing.length === 0
            ? this.ok()
            : this.error({
                identifier: "preconditionPermissions" /* PreconditionPermissions */,
                message: `I am missing the following permissions to run this command: ${missing
                    .map((perm) => CorePrecondition.readablePermissions[perm])
                    .join(', ')}`,
                context: { missing }
            });
    }
}
exports.CorePrecondition = CorePrecondition;
CorePrecondition.readablePermissions = {
    ADMINISTRATOR: 'Administrator',
    VIEW_AUDIT_LOG: 'View Audit Log',
    MANAGE_GUILD: 'Manage Server',
    MANAGE_ROLES: 'Manage Roles',
    MANAGE_CHANNELS: 'Manage Channels',
    KICK_MEMBERS: 'Kick Members',
    BAN_MEMBERS: 'Ban Members',
    CREATE_INSTANT_INVITE: 'Create Instant Invite',
    CHANGE_NICKNAME: 'Change Nickname',
    MANAGE_NICKNAMES: 'Manage Nicknames',
    MANAGE_EMOJIS: 'Manage Emojis',
    MANAGE_WEBHOOKS: 'Manage Webhooks',
    VIEW_CHANNEL: 'Read Messages',
    SEND_MESSAGES: 'Send Messages',
    SEND_TTS_MESSAGES: 'Send TTS Messages',
    MANAGE_MESSAGES: 'Manage Messages',
    EMBED_LINKS: 'Embed Links',
    ATTACH_FILES: 'Attach Files',
    READ_MESSAGE_HISTORY: 'Read Message History',
    MENTION_EVERYONE: 'Mention Everyone',
    USE_EXTERNAL_EMOJIS: 'Use External Emojis',
    ADD_REACTIONS: 'Add Reactions',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    STREAM: 'Stream',
    MUTE_MEMBERS: 'Mute Members',
    DEAFEN_MEMBERS: 'Deafen Members',
    MOVE_MEMBERS: 'Move Members',
    USE_VAD: 'Use Voice Activity',
    PRIORITY_SPEAKER: 'Priority Speaker',
    VIEW_GUILD_INSIGHTS: 'View Guild Insights'
};
//# sourceMappingURL=Permissions.js.map