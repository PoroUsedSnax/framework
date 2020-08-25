"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
var Events;
(function (Events) {
    // #region Discord.js base events
    Events["ChannelCreate"] = "channelCreate";
    Events["ChannelDelete"] = "channelDelete";
    Events["ChannelPinsUpdate"] = "channelPinsUpdate";
    Events["ChannelUpdate"] = "channelUpdate";
    Events["Debug"] = "debug";
    Events["Warn"] = "warn";
    Events["Disconnect"] = "disconnect";
    Events["EmojiCreate"] = "emojiCreate";
    Events["EmojiDelete"] = "emojiDelete";
    Events["EmojiUpdate"] = "emojiUpdate";
    Events["Error"] = "error";
    Events["GuildBanAdd"] = "guildBanAdd";
    Events["GuildBanRemove"] = "guildBanRemove";
    Events["GuildCreate"] = "guildCreate";
    Events["GuildDelete"] = "guildDelete";
    Events["GuildUnavailable"] = "guildUnavailable";
    Events["GuildIntegrationsUpdate"] = "guildIntegrationsUpdate";
    Events["GuildMemberAdd"] = "guildMemberAdd";
    Events["GuildMemberAvailable"] = "guildMemberAvailable";
    Events["GuildMemberRemove"] = "guildMemberRemove";
    Events["GuildMembersChunk"] = "guildMembersChunk";
    Events["GuildMemberSpeaking"] = "guildMemberSpeaking";
    Events["GuildMemberUpdate"] = "guildMemberUpdate";
    Events["GuildUpdate"] = "guildUpdate";
    Events["InviteCreate"] = "inviteCreate";
    Events["InviteDelete"] = "inviteDelete";
    Events["Message"] = "message";
    Events["MessageDelete"] = "messageDelete";
    Events["MessageReactionRemoveAll"] = "messageReactionRemoveAll";
    Events["MessageReactionRemoveEmoji"] = "messageReactionRemoveEmoji";
    Events["MessageDeleteBulk"] = "messageDeleteBulk";
    Events["MessageReactionAdd"] = "messageReactionAdd";
    Events["MessageReactionRemove"] = "messageReactionRemove";
    Events["MessageUpdate"] = "messageUpdate";
    Events["PresenceUpdate"] = "presenceUpdate";
    Events["RateLimit"] = "rateLimit";
    Events["Ready"] = "ready";
    Events["Invalidated"] = "invalidated";
    Events["RoleCreate"] = "roleCreate";
    Events["RoleDelete"] = "roleDelete";
    Events["RoleUpdate"] = "roleUpdate";
    Events["TypingsStart"] = "typingStart";
    Events["UserUpdate"] = "userUpdate";
    Events["VoiceStateUpdate"] = "voiceStateUpdate";
    Events["WebhookUpdate"] = "webhookUpdate";
    Events["ShardDisconnect"] = "shardDisconnect";
    Events["ShardError"] = "shardError";
    Events["SharedReady"] = "shardReady";
    Events["ShardReconnecting"] = "shardReconnecting";
    Events["ShardResume"] = "shardResume";
    // #endregion Discord.js base events
    // #region Sapphire load cycle events
    Events["PieceUnload"] = "pieceUnload";
    Events["PiecePostLoad"] = "piecePostLoad";
    Events["MentionPrefixOnly"] = "mentionPrefixOnly";
    Events["EventError"] = "eventError";
    Events["PrefixedMessage"] = "prefixedMessage";
    Events["UnknownCommandName"] = "unknownCommandName";
    Events["UnknownCommand"] = "unknownCommand";
    Events["PreCommandRun"] = "preCommandRun";
    Events["CommandDenied"] = "commandDenied";
    Events["CommandAccepted"] = "commandAccepted";
    Events["CommandRun"] = "commandRun";
    Events["CommandFinish"] = "commandFinish";
    Events["CommandError"] = "commandError";
    Events["PluginLoaded"] = "pluginLoaded";
    // #endregion Sapphire load cycle events
})(Events = exports.Events || (exports.Events = {}));
//# sourceMappingURL=Events.js.map