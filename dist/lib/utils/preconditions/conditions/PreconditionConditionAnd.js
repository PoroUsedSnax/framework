"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionConditionAnd = void 0;
const Result_1 = require("../../../parsers/Result");
/**
 * An [[IPreconditionCondition]] which runs all containers similarly to doing (V0 && V1 [&& V2 [&& V3 ...]]).
 * @since 1.0.0
 */
exports.PreconditionConditionAnd = {
    async sequential(message, command, entries, context) {
        for (const child of entries) {
            const result = await child.run(message, command, context);
            if (Result_1.isErr(result))
                return result;
        }
        return Result_1.ok();
    },
    async parallel(message, command, entries, context) {
        var _a;
        const results = await Promise.all(entries.map((entry) => entry.run(message, command, context)));
        // This is simplified compared to PreconditionContainerAny because we're looking for the first error.
        // However, the base implementation short-circuits with the first Ok.
        return (_a = results.find(Result_1.isErr)) !== null && _a !== void 0 ? _a : Result_1.ok();
    }
};
//# sourceMappingURL=PreconditionConditionAnd.js.map