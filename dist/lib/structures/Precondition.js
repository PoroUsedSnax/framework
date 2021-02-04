"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Precondition = void 0;
const pieces_1 = require("@sapphire/pieces");
const PreconditionError_1 = require("../errors/PreconditionError");
const Result_1 = require("../parsers/Result");
class Precondition extends pieces_1.Piece {
    ok() {
        return Result_1.ok();
    }
    /**
     * Constructs a [[PreconditionError]] with the precondition parameter set to `this`.
     * @param options The information.
     */
    error(options = {}) {
        return Result_1.err(new PreconditionError_1.PreconditionError({ precondition: this, ...options }));
    }
}
exports.Precondition = Precondition;
//# sourceMappingURL=Precondition.js.map