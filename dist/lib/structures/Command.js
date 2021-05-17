"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPreConditions = exports.Command = void 0;
const tslib_1 = require("tslib");
const pieces_1 = require("@sapphire/pieces");
const utilities_1 = require("@sapphire/utilities");
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
        this.preconditions = new PreconditionContainerArray_1.PreconditionContainerArray(this.resolveConstructorPreConditions(options));
    }
    /**
     * The pre-parse method. This method can be overridden by plugins to define their own argument parser.
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
    resolveConstructorPreConditions(options) {
        var _a, _b, _c;
        const preconditions = (_b = (_a = options.preconditions) === null || _a === void 0 ? void 0 : _a.slice()) !== null && _b !== void 0 ? _b : [];
        if (options.nsfw)
            preconditions.push("NSFW" /* NotSafeForWork */);
        const runIn = this.resolveConstructorPreConditionsRunType(options.runIn);
        if (runIn !== null)
            preconditions.push(runIn);
        const cooldownBucket = (_c = options.cooldownBucket) !== null && _c !== void 0 ? _c : 1;
        if (cooldownBucket && options.cooldownDuration) {
            preconditions.push({ name: "Cooldown" /* Cooldown */, context: { bucket: cooldownBucket, cooldown: options.cooldownDuration } });
        }
        return preconditions;
    }
    resolveConstructorPreConditionsRunType(runIn) {
        if (utilities_1.isNullish(runIn))
            return null;
        if (typeof runIn === 'string') {
            switch (runIn) {
                case 'dm':
                    return ["DMOnly" /* DirectMessageOnly */];
                case 'text':
                    return ["TextOnly" /* TextOnly */];
                case 'news':
                    return ["NewsOnly" /* NewsOnly */];
                case 'guild':
                    return ["GuildOnly" /* GuildOnly */];
                default:
                    return null;
            }
        }
        // If there's no channel it can run on, throw an error:
        if (runIn.length === 0) {
            throw new Error(`${this.constructor.name}[${this.name}]: "runIn" was specified as an empty array.`);
        }
        const dm = runIn.includes('dm');
        const text = runIn.includes('text');
        const news = runIn.includes('news');
        const guild = text && news;
        // If runs everywhere, optimise to null:
        if (dm && guild)
            return null;
        const array = [];
        if (dm)
            array.push("DMOnly" /* DirectMessageOnly */);
        if (guild)
            array.push("GuildOnly" /* GuildOnly */);
        else if (text)
            array.push("TextOnly" /* TextOnly */);
        else if (news)
            array.push("NewsOnly" /* NewsOnly */);
        return array;
    }
}
exports.Command = Command;
/**
 * The available command pre-conditions.
 * @since 2.0.0
 */
var CommandPreConditions;
(function (CommandPreConditions) {
    CommandPreConditions["Cooldown"] = "Cooldown";
    CommandPreConditions["NotSafeForWork"] = "NSFW";
    CommandPreConditions["DirectMessageOnly"] = "DMOnly";
    CommandPreConditions["TextOnly"] = "TextOnly";
    CommandPreConditions["NewsOnly"] = "NewsOnly";
    CommandPreConditions["GuildOnly"] = "GuildOnly";
})(CommandPreConditions = exports.CommandPreConditions || (exports.CommandPreConditions = {}));
//# sourceMappingURL=Command.js.map