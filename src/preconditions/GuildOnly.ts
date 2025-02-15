import type { CommandInteraction, ContextMenuInteraction, Message } from 'discord.js';
import { Identifiers } from '../lib/errors/Identifiers';
import { AllFlowsPrecondition } from '../lib/structures/Precondition';

export class CorePrecondition extends AllFlowsPrecondition {
	public messageRun(message: Message) {
		return message.guildId === null
			? this.error({ identifier: Identifiers.PreconditionGuildOnly, message: 'You cannot run this message command in DMs.' })
			: this.ok();
	}

	public chatInputRun(interaction: CommandInteraction) {
		return interaction.guildId === null
			? this.error({ identifier: Identifiers.PreconditionGuildOnly, message: 'You cannot run this chat input command in DMs.' })
			: this.ok();
	}

	public contextMenuRun(interaction: ContextMenuInteraction) {
		return interaction.guildId === null
			? this.error({ identifier: Identifiers.PreconditionGuildOnly, message: 'You cannot run this context menu command in DMs.' })
			: this.ok();
	}
}
