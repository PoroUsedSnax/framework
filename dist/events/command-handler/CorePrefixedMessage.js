"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.PrefixedMessage });
    }
    run(message, prefix) {
        const { client, stores } = this.container;
        // Retrieve the command name and validate:
        const commandPrefix = this.getCommandPrefix(message.content, prefix);
        const prefixLess = message.content.slice(commandPrefix.length).trim();
        // The character that separates the command name from the arguments, this will return -1 when '[p]command' is
        // passed, and a non -1 value when '[p]command arg' is passed instead.
        const spaceIndex = prefixLess.indexOf(' ');
        const commandName = spaceIndex === -1 ? prefixLess : prefixLess.slice(0, spaceIndex);
        if (commandName.length === 0) {
            client.emit(Events_1.Events.UnknownCommandName, { message, prefix, commandPrefix });
            return;
        }
        // Retrieve the command and validate:
        const command = stores.get('commands').get(client.options.caseInsensitiveCommands ? commandName.toLowerCase() : commandName);
        if (!command) {
            client.emit(Events_1.Events.UnknownCommand, { message, prefix, commandName, commandPrefix });
            return;
        }
        // Run the last stage before running the command:
        const parameters = spaceIndex === -1 ? '' : prefixLess.substr(spaceIndex + 1).trim();
        client.emit(Events_1.Events.PreCommandRun, { message, command, parameters, context: { commandName, commandPrefix, prefix } });
    }
    getCommandPrefix(content, prefix) {
        return typeof prefix === 'string' ? prefix : prefix.exec(content)[0];
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CorePrefixedMessage.js.map