"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Argument = void 0;
const pieces_1 = require("@sapphire/pieces");
const Args_1 = require("../parsers/Args");
/**
 * The base argument class. This class is abstract and is to be extended by subclasses implementing the methods. In
 * Sapphire's workflow, arguments are called when using [[Args]]'s methods (usually used inside [[Command]]s by default).
 *
 * @example
 * ```typescript
 * // TypeScript:
 * import { Argument, ArgumentResult, PieceContext } from '(at)sapphire/framework';
 * import { URL } from 'url';
 *
 * // Define a class extending `Argument`, then export it.
 * // NOTE: You can use `export default` or `export =` too.
 * export class CoreArgument extends Argument<URL> {
 *   public constructor(context: PieceContext) {
 *     super(context, { name: 'hyperlink', aliases: ['url'] });
 *   }
 *
 *   public run(argument: string): ArgumentResult<URL> {
 *     try {
 *       return this.ok(new URL(argument));
 *     } catch {
 *       return this.error(argument, 'ArgumentHyperlinkInvalidURL', 'The argument did not resolve to a valid URL.');
 *     }
 *   }
 * }
 *
 * // Augment the ArgType structure so `args.pick('url')`, `args.repeat('url')`
 * // and others have a return type of `URL`.
 * declare module 'sapphire/framework/dist/lib/utils/Args' {
 *   export interface ArgType {
 *     url: URL;
 *   }
 * }
 * ```
 *
 * @example
 * ```javascript
 * // JavaScript:
 * const { Argument } = require('(at)sapphire/framework');
 *
 * // Define a class extending `Argument`, then export it.
 * module.exports = class CoreArgument extends Argument {
 *   constructor(context) {
 *     super(context, { name: 'hyperlink', aliases: ['url'] });
 *   }
 *
 *   run(argument) {
 *     try {
 *       return this.ok(new URL(argument));
 *     } catch {
 *       return this.error(argument, 'ArgumentHyperlinkInvalidURL', 'The argument did not resolve to a valid URL.');
 *     }
 *   }
 * }
 * ```
 */
class Argument extends pieces_1.AliasPiece {
    /**
     * Wraps a value into a successful value.
     * @param value The value to wrap.
     */
    ok(value) {
        return Args_1.Args.ok(value);
    }
    /**
     * Constructs an [[ArgumentError]] with a custom type.
     * @param parameter The parameter that triggered the argument.
     * @param type The identifier for the error.
     * @param message The description message for the rejection.
     */
    error(options) {
        return Args_1.Args.error({ argument: this, ...options });
    }
}
exports.Argument = Argument;
//# sourceMappingURL=Argument.js.map