import type { Piece, Store } from '@sapphire/pieces';
import { AutocompleteInteraction, CommandInteraction, Constants, ContextMenuInteraction, Interaction, Message } from 'discord.js';
import type { UserError } from '../errors/UserError';
import type {
	AutocompleteCommand,
	AutocompleteCommandContext,
	ChatInputCommand,
	ChatInputCommandContext,
	Command,
	ContextMenuCommand,
	ContextMenuCommandContext,
	MessageCommand
} from '../structures/Command';
import type { InteractionHandler } from '../structures/InteractionHandler';
import type { Listener } from '../structures/Listener';
import type { PluginHook } from './Enums';

export const Events = {
	// #region Discord.js base events
	ChannelCreate: Constants.Events.CHANNEL_CREATE,
	ChannelDelete: Constants.Events.CHANNEL_DELETE,
	ChannelPinsUpdate: Constants.Events.CHANNEL_PINS_UPDATE,
	ChannelUpdate: Constants.Events.CHANNEL_UPDATE,
	ClientReady: Constants.Events.CLIENT_READY,
	Debug: Constants.Events.DEBUG,
	Error: Constants.Events.ERROR,
	GuildBanAdd: Constants.Events.GUILD_BAN_ADD,
	GuildBanRemove: Constants.Events.GUILD_BAN_REMOVE,
	GuildCreate: Constants.Events.GUILD_CREATE,
	GuildDelete: Constants.Events.GUILD_DELETE,
	GuildEmojiCreate: Constants.Events.GUILD_EMOJI_CREATE,
	GuildEmojiDelete: Constants.Events.GUILD_EMOJI_DELETE,
	GuildEmojiUpdate: Constants.Events.GUILD_EMOJI_UPDATE,
	GuildIntegrationsUpdate: Constants.Events.GUILD_INTEGRATIONS_UPDATE,
	GuildMemberAdd: Constants.Events.GUILD_MEMBER_ADD,
	GuildMemberAvailable: Constants.Events.GUILD_MEMBER_AVAILABLE,
	GuildMemberRemove: Constants.Events.GUILD_MEMBER_REMOVE,
	GuildMembersChunk: Constants.Events.GUILD_MEMBERS_CHUNK,
	GuildMemberUpdate: Constants.Events.GUILD_MEMBER_UPDATE,
	GuildRoleCreate: Constants.Events.GUILD_ROLE_CREATE,
	GuildRoleDelete: Constants.Events.GUILD_ROLE_DELETE,
	GuildRoleUpdate: Constants.Events.GUILD_ROLE_UPDATE,
	GuildStickerCreate: Constants.Events.GUILD_STICKER_CREATE,
	GuildStickerDelete: Constants.Events.GUILD_STICKER_DELETE,
	GuildStickerUpdate: Constants.Events.GUILD_STICKER_UPDATE,
	GuildUnavailable: Constants.Events.GUILD_UNAVAILABLE,
	GuildUpdate: Constants.Events.GUILD_UPDATE,
	InteractionCreate: Constants.Events.INTERACTION_CREATE,
	Invalidated: Constants.Events.INVALIDATED,
	InvalidRequestWarning: Constants.Events.INVALID_REQUEST_WARNING,
	InviteCreate: Constants.Events.INVITE_CREATE,
	InviteDelete: Constants.Events.INVITE_DELETE,
	MessageBulkDelete: Constants.Events.MESSAGE_BULK_DELETE,
	MessageCreate: Constants.Events.MESSAGE_CREATE,
	MessageDelete: Constants.Events.MESSAGE_DELETE,
	MessageReactionAdd: Constants.Events.MESSAGE_REACTION_ADD,
	MessageReactionRemove: Constants.Events.MESSAGE_REACTION_REMOVE,
	MessageReactionRemoveAll: Constants.Events.MESSAGE_REACTION_REMOVE_ALL,
	MessageReactionRemoveEmoji: Constants.Events.MESSAGE_REACTION_REMOVE_EMOJI,
	MessageUpdate: Constants.Events.MESSAGE_UPDATE,
	PresenceUpdate: Constants.Events.PRESENCE_UPDATE,
	RateLimit: Constants.Events.RATE_LIMIT,
	Raw: Constants.Events.RAW,
	ShardDisconnect: Constants.Events.SHARD_DISCONNECT,
	ShardError: Constants.Events.SHARD_ERROR,
	ShardReady: Constants.Events.SHARD_READY,
	ShardReconnecting: Constants.Events.SHARD_RECONNECTING,
	ShardResume: Constants.Events.SHARD_RESUME,
	StageInstanceCreate: Constants.Events.STAGE_INSTANCE_CREATE,
	StageInstanceDelete: Constants.Events.STAGE_INSTANCE_DELETE,
	StageInstanceUpdate: Constants.Events.STAGE_INSTANCE_UPDATE,
	ThreadCreate: Constants.Events.THREAD_CREATE,
	ThreadDelete: Constants.Events.THREAD_DELETE,
	ThreadListSync: Constants.Events.THREAD_LIST_SYNC,
	ThreadMembersUpdate: Constants.Events.THREAD_MEMBERS_UPDATE,
	ThreadMemberUpdate: Constants.Events.THREAD_MEMBER_UPDATE,
	ThreadUpdate: Constants.Events.THREAD_UPDATE,
	TypingStart: Constants.Events.TYPING_START,
	UserUpdate: Constants.Events.USER_UPDATE,
	VoiceServerUpdate: Constants.Events.VOICE_SERVER_UPDATE,
	VoiceStateUpdate: Constants.Events.VOICE_STATE_UPDATE,
	Warn: Constants.Events.WARN,
	WebhooksUpdate: Constants.Events.WEBHOOKS_UPDATE,
	// #endregion Discord.js base events

	// #region Sapphire events
	// Message commands chain
	/**
	 * Emitted when a message is created that was not sent by bots or webhooks.
	 * @param {Message} message The created message
	 */
	PreMessageParsed: 'preMessageParsed' as const,
	/**
	 * Emitted when a message is created consisting of only the bot's mention.
	 * @param {Message} message The created message
	 */
	MentionPrefixOnly: 'mentionPrefixOnly' as const,
	/**
	 * Emitted when a message is created that does not start with a valid prefix.
	 * @param {Message} message The created message
	 */
	NonPrefixedMessage: 'nonPrefixedMessage' as const,
	/**
	 * Emitted when a message is created that does starts with a valid prefix.
	 * @param {Message} message The created message
	 */
	PrefixedMessage: 'prefixedMessage' as const,

	/**
	 * Emitted when a message starts with a valid prefix but does not include a command name.
	 * @param {UnknownMessageCommandNamePayload} payload
	 */
	UnknownMessageCommandName: 'unknownMessageCommandName' as const,
	/**
	 * Emitted when the name of a sent message command does not match any loaded commands.
	 * @param {UnknownMessageCommandPayload} payload The contextual payload
	 */
	UnknownMessageCommand: 'unknownMessageCommand' as const,
	/**
	 * Emitted when a message command is executed but a `messageRun` method is not found.
	 * @param {CommandDoesNotHaveMessageCommandHandler} payload The contextual payload
	 */
	CommandDoesNotHaveMessageCommandHandler: 'commandDoesNotHaveMessageCommandHandler' as const,
	/**
	 * Emitted before the `messageRun` method of a command is run.
	 * @param {PreMessageCommandRunPayload} payload The contextual payload
	 */
	PreMessageCommandRun: 'preMessageCommandRun' as const,

	/**
	 * Emitted when a precondition denies a message command from being run.
	 * @param {UserError} error The error reported by the precondition
	 * @param {MessageCommandDeniedPayload} payload The contextual payload
	 */
	MessageCommandDenied: 'messageCommandDenied' as const,
	/**
	 * Emitted when a message command passes all precondition checks, if any.
	 * @param {MessageCommandAcceptedPayload} payload The contextual payload
	 */
	MessageCommandAccepted: 'messageCommandAccepted' as const,

	/**
	 * Emitted directly before a message command is run.
	 * @param {Message} message The message that executed the command
	 * @param {Command} command The command that is being run
	 * @param {MessageCommandRunPayload} payload The contextual payload
	 */
	MessageCommandRun: 'messageCommandRun' as const,
	/**
	 * Emitted after a message command runs successfully.
	 * @param {MessageCommandSuccessPayload} payload The contextual payload
	 */
	MessageCommandSuccess: 'messageCommandSuccess' as const,
	/**
	 * Emitted after a message command runs unsuccesfully.
	 * @param {*} error The error that was thrown
	 * @param {MessageCommandErrorPayload} payload The contextual payload
	 */
	MessageCommandError: 'messageCommandError' as const,
	/**
	 * Emitted directly after a message command finished running, regardless of the outcome.
	 * @param {Message} message The message that executed the command
	 * @param {Command} command The command that finished running
	 * @param {MessageCommandFinishPayload} payload The contextual payload
	 */
	MessageCommandFinish: 'messageCommandFinish' as const,

	/**
	 * Emitted after the bot unsuccessfully tried to start typing when a command is executed.
	 * @param error The error that was thrown
	 * @param payload The contextual payload
	 */
	MessageCommandTypingError: 'messageCommandTypingError' as const,

	// Listener errors
	/**
	 * Emitted when an error is encountered when executing a listener.
	 * @param {*} error The error that was thrown
	 * @param {ListenerErrorPayload} payload The contextual payload
	 */
	ListenerError: 'listenerError' as const,

	// Registry errors
	/**
	 * Emitted when an error is encountered when handling the command application command registry.
	 * @param {*} error The error that was thrown
	 * @param {Command} command The command who's registry caused the error
	 */
	CommandApplicationCommandRegistryError: 'commandApplicationCommandRegistryError' as const,

	// Piece store?
	/**
	 * Emitted after a piece is loaded.
	 * @param {Store<Piece>} store The store in which the piece belongs to
	 * @param {Piece} piece The piece that was loaded
	 */
	PiecePostLoad: 'piecePostLoad' as const,
	/**
	 * Emitted when a piece is unloaded.
	 * @param {Store<Piece>} store The store in which the piece belongs to
	 * @param {Piece} piece The piece that was unloaded
	 */
	PieceUnload: 'pieceUnload' as const,

	// Plugin
	/**
	 * Emitted when a plugin is loaded.
	 * @param {PluginHook} hook The plugin hook that was loaded
	 * @param {string | undefined} name The name of the plugin, if any
	 */
	PluginLoaded: 'pluginLoaded' as const,

	// Interaction handlers
	/**
	 * Emitted when the `parse` method of an interaction handler encounters an error.
	 * @param {*} error The error that was encountered
	 * @param {InteractionHandlerParseError} payload The contextual payload
	 */
	InteractionHandlerParseError: 'interactionHandlerParseError' as const,
	/**
	 * Emitted when an error is encountered when executing an interaction handler.
	 * @param {*} error The error that was encountered
	 * @param {InteractionHandlerError} payload The contextual payload
	 */
	InteractionHandlerError: 'interactionHandlerError' as const,

	// Autocomplete interaction
	/**
	 * Emitted when an autocomplete interaction is recieved.
	 * @param {AutocompleteInteraction} interaction The interaction that was recieved
	 */
	PossibleAutocompleteInteraction: 'possibleAutocompleteInteraction' as const,
	/**
	 * Emitted after an autocomplete interaction handler runs successfully.
	 * @param {AutocompleteInteractionPayload} payload The contextual payload
	 */
	CommandAutocompleteInteractionSuccess: 'commandAutocompleteInteractionSuccess' as const,
	/**
	 * Emitted when an error is encountered when executing an autocomplete interaction handler.
	 * @param {*} error The error that was encountered
	 * @param {AutocompleteInteractionPayload} payload The contextual payload
	 */
	CommandAutocompleteInteractionError: 'commandAutocompleteInteractionError' as const,

	// Chat input command chain
	/**
	 * Emitted when a chat input command interaction is recieved.
	 * @param {CommandInteraction} interaction The interaction that was recieved.
	 */
	PossibleChatInputCommand: 'possibleChatInputCommand' as const,
	/**
	 * Emitted when the name of a sent chat input command does not match any loaded commands.
	 * @param {UnknownChatInputCommandPayload} payload The contextual payload
	 */
	UnknownChatInputCommand: 'unknownChatInputCommand' as const,
	/**
	 * Emitted when a chat input command is executed but a `chatInputRun` method is not found.
	 * @param {CommandDoesNotHaveChatInputCommandHandlerPayload} payload The contextual payload
	 */
	CommandDoesNotHaveChatInputCommandHandler: 'commandDoesNotHaveChatInputCommandHandler' as const,
	/**
	 * Emitted before the `chatInputRun` method of a command is run.
	 * @param {PreChatInputCommandRunPayload} payload The contextual payload
	 */
	PreChatInputCommandRun: 'preChatInputCommandRun' as const,

	/**
	 * Emitted when a precondition denies a chat input command from being run.
	 * @param {UserError} error The error reported by the precondition
	 * @param {ChatInputCommandDeniedPayload} payload The contextual payload
	 */
	ChatInputCommandDenied: 'chatInputCommandDenied' as const,
	/**
	 * Emitted when a chat input command passes all precondition checks, if any.
	 * @param {ChatInputCommandAcceptedPayload} payload The contextual payload
	 */
	ChatInputCommandAccepted: 'chatInputCommandAccepted' as const,

	/**
	 * Emitted directly before a chat input command is run.
	 * @param {CommandInteraction} interaction The interaction that executed the command
	 * @param {ChatInputCommand} command The command that is being run
	 * @param {ChatInputCommandRunPayload} payload The contextual payload
	 */
	ChatInputCommandRun: 'chatInputCommandRun' as const,
	/**
	 * Emitted after a chat input command runs successfully.
	 * @param {ChatInputCommandSuccessPayload} payload The contextual payload
	 */
	ChatInputCommandSuccess: 'chatInputCommandSuccess' as const,
	/**
	 * Emitted after a chat input command runs unsuccesfully.
	 * @param {*} error The error that was thrown
	 * @param {ChatInputCommandErrorPayload} payload The contextual payload
	 */
	ChatInputCommandError: 'chatInputCommandError' as const,
	/**
	 * Emitted directly after a chat input command finished running, regardless of the outcome.
	 * @param {Interaction} interaction The interaction that executed the command
	 * @param {ChatInputCommand} command The command that finished running
	 * @param {ChatInputCommandFinishPayload} payload The contextual payload
	 */
	ChatInputCommandFinish: 'chatInputCommandFinish' as const,

	// Context menu chain
	/**
	 * Emitted when a context menu interaction is recieved.
	 * @param {ContextMenuInteraction} interaction The interaction that was recieved.
	 */
	PossibleContextMenuCommand: 'possibleContextMenuCommand' as const,
	/**
	 * Emitted when the name of a sent context menu command does not match any loaded commands.
	 * @param {UnknownContextMenuCommandPayload} payload The contextual payload
	 */
	UnknownContextMenuCommand: 'unknownContextMenuCommand' as const,
	/**
	 * Emitted when a chat input command is executed but a `contextMenuRun` method is not found.
	 * @param {CommandDoesNotHaveContextMenuCommandHandlerPayload} payload The contextual payload
	 */
	CommandDoesNotHaveContextMenuCommandHandler: 'commandDoesNotHaveContextMenuCommandHandler' as const,
	/**
	 * Emitted before the `contextMenuRun` method of a command is run.
	 * @param {PreContextMenuCommandRunPayload} payload The contextual payload
	 */
	PreContextMenuCommandRun: 'preContextMenuCommandRun' as const,

	/**
	 * Emitted when a precondition denies a context menu command from being run.
	 * @param {UserError} error The error reported by the precondition
	 * @param {ContextMenuCommandDeniedPayload} payload The contextual payload
	 */
	ContextMenuCommandDenied: 'contextMenuCommandDenied' as const,
	/**
	 * Emitted when a context menu command passes all precondition checks, if any.
	 * @param {ContextMenuCommandAcceptedPayload} payload The contextual payload
	 */
	ContextMenuCommandAccepted: 'contextMenuCommandAccepted' as const,

	/**
	 * Emitted directly before a context menu command is run.
	 * @param {ContextMenuInteraction} interaction The interaction that executed the command
	 * @param {ContextMenuCommand} command The command that is being run
	 * @param {ContextMenuCommandRunPayload} payload The contextual payload
	 */
	ContextMenuCommandRun: 'contextMenuCommandRun' as const,
	/**
	 * Emitted after a context menu command runs successfully.
	 * @param {ContextMenuCommandSuccessPayload} payload The contextual payload
	 */
	ContextMenuCommandSuccess: 'contextMenuCommandSuccess' as const,
	/**
	 * Emitted after a context menu command runs unsuccesfully.
	 * @param {*} error The error that was thrown
	 * @param {ContextMenuCommandErrorPayload} payload The contextual payload
	 */
	ContextMenuCommandError: 'contextMenuCommandError' as const,
	/**
	 * Emitted directly after a context menu command finished running, regardless of the outcome.
	 * @param {Interaction} interaction The interaction that executed the command
	 * @param {ContextMenuCommand} command The command that finished running
	 * @param {ContextMenuCommandFinishPayload} payload The contextual payload
	 */
	ContextMenuCommandFinish: 'contextMenuCommandFinish' as const

	// #endregion Sapphire events
};

export interface IPieceError {
	piece: Piece;
}

export interface ListenerErrorPayload extends IPieceError {
	piece: Listener;
}

export interface UnknownMessageCommandNamePayload {
	message: Message;
	prefix: string | RegExp;
	commandPrefix: string;
}

export interface CommandDoesNotHaveMessageCommandHandler {
	message: Message;
	prefix: string | RegExp;
	commandPrefix: string;
	command: Command;
}

export interface UnknownMessageCommandPayload extends UnknownMessageCommandNamePayload {
	commandName: string;
}

export interface IMessageCommandPayload {
	message: Message;
	command: MessageCommand;
}

export interface PreMessageCommandRunPayload extends MessageCommandDeniedPayload {}

export interface MessageCommandDeniedPayload extends IMessageCommandPayload {
	parameters: string;
	context: MessageCommand.RunContext;
}

export interface MessageCommandAcceptedPayload extends IMessageCommandPayload {
	parameters: string;
	context: MessageCommand.RunContext;
}

export interface MessageCommandRunPayload extends MessageCommandAcceptedPayload {
	args: unknown;
}

export interface MessageCommandFinishPayload extends MessageCommandRunPayload {
	duration: number;
}

export interface MessageCommandErrorPayload extends MessageCommandRunPayload {
	duration: number;
}

export interface MessageCommandSuccessPayload extends MessageCommandRunPayload {
	result: unknown;
	duration: number;
}

export interface MessageCommandTypingErrorPayload extends MessageCommandRunPayload {}

export interface UnknownChatInputCommandPayload {
	interaction: CommandInteraction;
	context: ChatInputCommandContext;
}

export interface CommandDoesNotHaveChatInputCommandHandlerPayload {
	interaction: CommandInteraction;
	command: Command;
	context: ChatInputCommandContext;
}

export interface IChatInputCommandPayload {
	interaction: CommandInteraction;
	command: ChatInputCommand;
}

export interface PreChatInputCommandRunPayload extends IChatInputCommandPayload {
	context: ChatInputCommandContext;
}

export interface ChatInputCommandDeniedPayload extends IChatInputCommandPayload {
	context: ChatInputCommandContext;
}

export interface ChatInputCommandAcceptedPayload extends PreChatInputCommandRunPayload {}

export interface ChatInputCommandRunPayload extends ChatInputCommandAcceptedPayload {}

export interface ChatInputCommandFinishPayload extends ChatInputCommandAcceptedPayload {
	duration: number;
}

export interface ChatInputCommandSuccessPayload extends ChatInputCommandRunPayload {
	result: unknown;
	duration: number;
}

export interface ChatInputCommandErrorPayload extends IChatInputCommandPayload {
	duration: number;
}

export interface UnknownContextMenuCommandPayload {
	interaction: ContextMenuInteraction;
	context: ContextMenuCommandContext;
}

export interface CommandDoesNotHaveContextMenuCommandHandlerPayload {
	interaction: ContextMenuInteraction;
	context: ContextMenuCommandContext;
	command: Command;
}

export interface IContextMenuCommandPayload {
	interaction: ContextMenuInteraction;
	command: ContextMenuCommand;
}

export interface PreContextMenuCommandRunPayload extends IContextMenuCommandPayload {
	context: ContextMenuCommandContext;
}

export interface ContextMenuCommandDeniedPayload extends IContextMenuCommandPayload {
	context: ContextMenuCommandContext;
}

export interface ContextMenuCommandAcceptedPayload extends PreContextMenuCommandRunPayload {}

export interface ContextMenuCommandRunPayload extends ContextMenuCommandAcceptedPayload {}

export interface ContextMenuCommandFinishPayload extends ContextMenuCommandAcceptedPayload {
	duration: number;
}

export interface ContextMenuCommandSuccessPayload extends ContextMenuCommandRunPayload {
	result: unknown;
	duration: number;
}

export interface ContextMenuCommandErrorPayload extends IContextMenuCommandPayload {
	duration: number;
}

export interface IInteractionHandlerPayload {
	interaction: Interaction;
	handler: InteractionHandler;
}

export interface InteractionHandlerParseError extends IInteractionHandlerPayload {}

export interface InteractionHandlerError extends IInteractionHandlerPayload {}

export interface AutocompleteInteractionPayload {
	interaction: AutocompleteInteraction;
	command: AutocompleteCommand;
	context: AutocompleteCommandContext;
}

declare module 'discord.js' {
	interface ClientEvents {
		// #region Sapphire load cycle events
		[Events.PieceUnload]: [store: Store<Piece>, piece: Piece];
		[Events.PiecePostLoad]: [store: Store<Piece>, piece: Piece];

		[Events.ListenerError]: [error: unknown, payload: ListenerErrorPayload];
		[Events.CommandApplicationCommandRegistryError]: [error: unknown, command: Command];

		[Events.PreMessageParsed]: [message: Message];
		[Events.MentionPrefixOnly]: [message: Message];
		[Events.NonPrefixedMessage]: [message: Message];
		[Events.PrefixedMessage]: [message: Message, prefix: string | RegExp];

		[Events.UnknownMessageCommandName]: [payload: UnknownMessageCommandNamePayload];
		[Events.UnknownMessageCommand]: [payload: UnknownMessageCommandPayload];
		[Events.CommandDoesNotHaveMessageCommandHandler]: [payload: CommandDoesNotHaveMessageCommandHandler];
		[Events.PreMessageCommandRun]: [payload: PreMessageCommandRunPayload];

		[Events.MessageCommandDenied]: [error: UserError, payload: MessageCommandDeniedPayload];
		[Events.MessageCommandAccepted]: [payload: MessageCommandAcceptedPayload];

		[Events.MessageCommandRun]: [message: Message, command: Command, payload: MessageCommandRunPayload];
		[Events.MessageCommandSuccess]: [payload: MessageCommandSuccessPayload];
		[Events.MessageCommandError]: [error: unknown, payload: MessageCommandErrorPayload];
		[Events.MessageCommandFinish]: [message: Message, command: Command, payload: MessageCommandFinishPayload];

		[Events.MessageCommandTypingError]: [error: Error, payload: MessageCommandTypingErrorPayload];

		[Events.PluginLoaded]: [hook: PluginHook, name: string | undefined];

		[Events.InteractionHandlerParseError]: [error: unknown, payload: InteractionHandlerParseError];
		[Events.InteractionHandlerError]: [error: unknown, payload: InteractionHandlerError];

		[Events.PossibleAutocompleteInteraction]: [interaction: AutocompleteInteraction];
		[Events.CommandAutocompleteInteractionError]: [error: unknown, payload: AutocompleteInteractionPayload];
		[Events.CommandAutocompleteInteractionSuccess]: [payload: AutocompleteInteractionPayload];

		// Chat input command chain
		[Events.PossibleChatInputCommand]: [interaction: CommandInteraction];
		[Events.UnknownChatInputCommand]: [payload: UnknownChatInputCommandPayload];
		[Events.CommandDoesNotHaveChatInputCommandHandler]: [payload: CommandDoesNotHaveChatInputCommandHandlerPayload];
		[Events.PreChatInputCommandRun]: [payload: PreChatInputCommandRunPayload];

		[Events.ChatInputCommandDenied]: [error: UserError, payload: ChatInputCommandDeniedPayload];
		[Events.ChatInputCommandAccepted]: [payload: ChatInputCommandAcceptedPayload];

		[Events.ChatInputCommandRun]: [interaction: CommandInteraction, command: ChatInputCommand, payload: ChatInputCommandRunPayload];
		[Events.ChatInputCommandSuccess]: [payload: ChatInputCommandSuccessPayload];
		[Events.ChatInputCommandError]: [error: unknown, payload: ChatInputCommandErrorPayload];
		[Events.ChatInputCommandFinish]: [interaction: CommandInteraction, command: ChatInputCommand, payload: ChatInputCommandFinishPayload];

		// Context menu command chain
		[Events.PossibleContextMenuCommand]: [interaction: ContextMenuInteraction];
		[Events.UnknownContextMenuCommand]: [payload: UnknownContextMenuCommandPayload];
		[Events.CommandDoesNotHaveContextMenuCommandHandler]: [payload: CommandDoesNotHaveContextMenuCommandHandlerPayload];
		[Events.PreContextMenuCommandRun]: [payload: PreContextMenuCommandRunPayload];

		[Events.ContextMenuCommandDenied]: [error: UserError, payload: ContextMenuCommandDeniedPayload];
		[Events.ContextMenuCommandAccepted]: [payload: ContextMenuCommandAcceptedPayload];

		[Events.ContextMenuCommandRun]: [interaction: ContextMenuInteraction, command: ContextMenuCommand, payload: ContextMenuCommandRunPayload];
		[Events.ContextMenuCommandSuccess]: [payload: ContextMenuCommandSuccessPayload];
		[Events.ContextMenuCommandError]: [error: unknown, payload: ContextMenuCommandErrorPayload];
		[Events.ContextMenuCommandFinish]: [
			interaction: ContextMenuInteraction,
			command: ContextMenuCommand,
			payload: ContextMenuCommandFinishPayload
		];

		// #endregion Sapphire load cycle events

		// #region Termination
		[K: string]: unknown[];
		// #endregion Termination
	}
}
