"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const tslib_1 = require("tslib");
const pieces_1 = require("@sapphire/pieces");
const Lexure = tslib_1.__importStar(require("lexure"));
const Args_1 = require("../parsers/Args");
const PreconditionContainerArray_1 = require("../utils/preconditions/PreconditionContainerArray");
const FlagUnorderedStrategy_1 = require("../utils/strategies/FlagUnorderedStrategy");
class Command extends pieces_1.AliasPiece {
    /**
     * @since 1.0.0
     * @param context The context.
     * @param options Optional Command settings.
     */
    constructor(context, { name, ...options } = {}) {
        var _a, _b, _c;
        super(context, { ...options, name: (name !== null && name !== void 0 ? name : context.name).toLowerCase() });
        /**
         * The lexer to be used for command parsing
         * @since 1.0.0
         * @private
         */
        this.lexer = new Lexure.Lexer();
        this.description = (_a = options.description) !== null && _a !== void 0 ? _a : '';
        this.detailedDescription = (_b = options.detailedDescription) !== null && _b !== void 0 ? _b : '';
        this.preconditions = new PreconditionContainerArray_1.PreconditionContainerArray(options.preconditions);
        this.strategy = new FlagUnorderedStrategy_1.FlagUnorderedStrategy(options.strategyOptions);
        this.lexer.setQuotes((_c = options.quotes) !== null && _c !== void 0 ? _c : [
            ['"', '"'],
            ['“', '”'],
            ['「', '」'] // Corner brackets (CJK)
        ]);
        if (options.generateDashLessAliases) {
            const dashLessAliases = [];
            if (this.name.includes('-'))
                dashLessAliases.push(this.name.replace(/-/g, ''));
            for (const alias of this.aliases)
                if (alias.includes('-'))
                    dashLessAliases.push(alias.replace(/-/g, ''));
            this.aliases = [...this.aliases, ...dashLessAliases];
        }
    }
    /**
     * The pre-parse method. This method can be overriden by plugins to define their own argument parser.
     * @param message The message that triggered the command.
     * @param parameters The raw parameters as a single string.
     * @param context The command-context used in this execution.
     */
    preParse(message, parameters, context) {
        const parser = new Lexure.Parser(this.lexer.setInput(parameters).lex()).setUnorderedStrategy(this.strategy);
        const args = new Lexure.Args(parser.parse());
        return new Args_1.Args(message, this, args, context);
    }
    /**
     * Defines the JSON.stringify behavior of the command.
     */
    toJSON() {
        return {
            ...super.toJSON(),
            description: this.description,
            detailedDescription: this.detailedDescription,
            strategy: this.strategy
        };
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map