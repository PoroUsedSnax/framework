"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = void 0;
const pieces_1 = require("@sapphire/pieces");
const ArgumentError_1 = require("../errors/ArgumentError");
const UserError_1 = require("../errors/UserError");
const Maybe_1 = require("./Maybe");
const Result_1 = require("./Result");
/**
 * The argument parser to be used in [[Command]].
 */
class Args {
    constructor(message, command, parser, context) {
        this.states = [];
        this.message = message;
        this.command = command;
        this.parser = parser;
        this.commandContext = context;
    }
    /**
     * Sets the parser to the first token.
     */
    start() {
        this.parser.state = {
            usedIndices: new Set(),
            position: 0,
            positionFromEnd: this.parser.parserOutput.ordered.length - 1
        };
        return this;
    }
    async pickResult(type, options = {}) {
        const argument = this.resolveArgument(type);
        if (!argument)
            return this.unavailableArgument(type);
        const result = await this.parser.singleParseAsync(async (arg) => argument.run(arg, {
            args: this,
            argument,
            message: this.message,
            command: this.command,
            commandContext: this.commandContext,
            ...options
        }));
        if (result === null)
            return this.missingArguments();
        if (Result_1.isOk(result))
            return result;
        return result;
    }
    async pick(type, options) {
        const result = await this.pickResult(type, options);
        if (Result_1.isOk(result))
            return result.value;
        throw result.error;
    }
    async restResult(type, options = {}) {
        const argument = this.resolveArgument(type);
        if (!argument)
            return this.unavailableArgument(type);
        if (this.parser.finished)
            return this.missingArguments();
        const state = this.parser.save();
        const data = this.parser.many().reduce((acc, token) => `${acc}${token.value}${token.trailing}`, '');
        const result = await argument.run(data, {
            args: this,
            argument,
            message: this.message,
            command: this.command,
            commandContext: this.commandContext,
            ...options
        });
        if (Result_1.isOk(result))
            return result;
        this.parser.restore(state);
        return result;
    }
    async rest(type, options) {
        const result = await this.restResult(type, options);
        if (Result_1.isOk(result))
            return result.value;
        throw result.error;
    }
    async repeatResult(type, options = {}) {
        var _a;
        const argument = this.resolveArgument(type);
        if (!argument)
            return this.unavailableArgument(type);
        if (this.parser.finished)
            return this.missingArguments();
        const output = [];
        for (let i = 0, times = (_a = options.times) !== null && _a !== void 0 ? _a : Infinity; i < times; i++) {
            const result = await this.parser.singleParseAsync(async (arg) => argument.run(arg, {
                args: this,
                argument,
                message: this.message,
                command: this.command,
                commandContext: this.commandContext,
                ...options
            }));
            if (result === null)
                break;
            if (Result_1.isErr(result)) {
                if (output.length === 0)
                    return result;
                break;
            }
            output.push(result.value);
        }
        return Result_1.ok(output);
    }
    async repeat(type, options) {
        const result = await this.repeatResult(type, options);
        if (Result_1.isOk(result))
            return result.value;
        throw result.error;
    }
    async peekResult(type, options = {}) {
        this.save();
        const result = typeof type === 'function' ? await type() : await this.pickResult(type, options);
        this.restore();
        return result;
    }
    async peek(type, options) {
        const result = await this.peekResult(type, options);
        if (Result_1.isOk(result))
            return result.value;
        throw result.error;
    }
    nextMaybe(cb) {
        return Maybe_1.maybe(typeof cb === 'function' ? this.parser.singleMap(cb) : this.parser.single());
    }
    next(cb) {
        const value = cb ? this.nextMaybe(cb) : this.nextMaybe();
        return Maybe_1.isSome(value) ? value.value : null;
    }
    /**
     * Checks if one or more flag were given.
     * @param keys The name(s) of the flag.
     * @example
     * ```typescript
     * // Suppose args are from '--f --g'.
     * console.log(args.getFlags('f'));
     * >>> true
     *
     * console.log(args.getFlags('g', 'h'));
     * >>> true
     *
     * console.log(args.getFlags('h'));
     * >>> false
     * ```
     */
    getFlags(...keys) {
        return this.parser.flag(...keys);
    }
    /**
     * Gets the last value of one or more options.
     * @param keys The name(s) of the option.
     * @example
     * ```typescript
     * // Suppose args are from '--a=1 --b=2 --c=3'.
     * console.log(args.getOption('a'));
     * >>> '1'
     *
     * console.log(args.getOption('b', 'c'));
     * >>> '2'
     *
     * console.log(args.getOption('d'));
     * >>> null
     * ```
     */
    getOption(...keys) {
        return this.parser.option(...keys);
    }
    /**
     * Gets all the values of one or more option.
     * @param keys The name(s) of the option.
     * @example
     * ```typescript
     * // Suppose args are from '--a=1 --a=1 --b=2 --c=3'.
     * console.log(args.getOptions('a'));
     * >>> ['1', '1']
     *
     * console.log(args.getOptions('b', 'c'));
     * >>> ['2', '3']
     *
     * console.log(args.getOptions('d'));
     * >>> null
     * ```
     */
    getOptions(...keys) {
        return this.parser.options(...keys);
    }
    /**
     * Saves the current state into the stack following a FILO strategy (first-in, last-out).
     * @seealso [[Args.restore]]
     */
    save() {
        this.states.push(this.parser.save());
    }
    /**
     * Restores the previously saved state from the stack.
     * @seealso [[Args.save]]
     */
    restore() {
        if (this.states.length !== 0)
            this.parser.restore(this.states.pop());
    }
    /**
     * Whether all arguments have been consumed.
     */
    get finished() {
        return this.parser.finished;
    }
    unavailableArgument(type) {
        return Result_1.err(new UserError_1.UserError({
            identifier: 'UnavailableArgument',
            message: `The argument "${typeof type === 'string' ? type : type.name}" was not found.`
        }));
    }
    missingArguments() {
        return Result_1.err(new UserError_1.UserError({ identifier: 'MissingArguments', message: 'There are no more arguments.' }));
    }
    /**
     * Resolves an argument.
     * @param arg The argument name or [[IArgument]] instance.
     */
    resolveArgument(arg) {
        if (typeof arg === 'object')
            return arg;
        return pieces_1.Store.injectedContext.stores.get('arguments').get(arg);
    }
    /**
     * Converts a callback into an usable argument.
     * @param cb The callback to convert into an [[IArgument]].
     */
    static make(cb, name = '') {
        return { run: cb, name };
    }
    /**
     * Constructs an [[ArgumentError]] with a custom type.
     * @param argument The argument that caused the rejection.
     * @param parameter The parameter that triggered the argument.
     * @param type The identifier for the error.
     * @param message The description message for the rejection.
     */
    static error(options) {
        return new ArgumentError_1.ArgumentError(options);
    }
}
exports.Args = Args;
//# sourceMappingURL=Args.js.map