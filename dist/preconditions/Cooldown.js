"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorePrecondition = void 0;
const ratelimits_1 = require("@sapphire/ratelimits");
require("../lib/errors/Identifiers");
const Precondition_1 = require("../lib/structures/Precondition");
require("../lib/types/Enums");
class CorePrecondition extends Precondition_1.Precondition {
    constructor() {
        super(...arguments);
        this.buckets = new WeakMap();
    }
    run(message, command, context) {
        // If the command it is testing for is not this one, return ok:
        if (context.external)
            return this.ok();
        // If there is no delay (undefined, null, 0), return ok:
        if (!context.delay)
            return this.ok();
        const bucket = this.getBucket(command, context);
        const remaining = bucket.take(this.getID(message, context));
        return remaining === 0
            ? this.ok()
            : this.error({
                identifier: "preconditionCooldown" /* PreconditionCooldown */,
                message: `You have just used this command. Try again in ${Math.ceil(remaining / 1000)} second${remaining > 1000 ? 's' : ''}.`,
                context: { remaining }
            });
    }
    getID(message, context) {
        switch (context.bucketType) {
            case 1 /* Global */:
                return 'global';
            case 0 /* Channel */:
                return message.channel.id;
            case 2 /* Guild */:
                return message.guild.id;
            default:
                return message.author.id;
        }
    }
    getBucket(command, context) {
        var _a;
        let bucket = this.buckets.get(command);
        if (!bucket) {
            bucket = new ratelimits_1.Bucket();
            if (((_a = context.limit) !== null && _a !== void 0 ? _a : 1) <= 1)
                bucket.setDelay(context.delay);
            else
                bucket.setLimit({ timespan: context.delay, maximum: context.limit });
            this.buckets.set(command, bucket);
        }
        return bucket;
    }
}
exports.CorePrecondition = CorePrecondition;
//# sourceMappingURL=Cooldown.js.map