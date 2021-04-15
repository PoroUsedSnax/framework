// Version: 1.0.0 - April 15, 2021 19:51:55
'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.Store = exports.Piece = exports.MissingExportsError = exports.LoaderError = exports.AliasStore = exports.AliasPiece = void 0;
const tslib_1 = require("tslib");
var pieces_1 = require("@sapphire/pieces");
Object.defineProperty(exports, "AliasPiece", { enumerable: true, get: function () { return pieces_1.AliasPiece; } });
Object.defineProperty(exports, "AliasStore", { enumerable: true, get: function () { return pieces_1.AliasStore; } });
Object.defineProperty(exports, "LoaderError", { enumerable: true, get: function () { return pieces_1.LoaderError; } });
Object.defineProperty(exports, "MissingExportsError", { enumerable: true, get: function () { return pieces_1.MissingExportsError; } });
Object.defineProperty(exports, "Piece", { enumerable: true, get: function () { return pieces_1.Piece; } });
Object.defineProperty(exports, "Store", { enumerable: true, get: function () { return pieces_1.Store; } });
tslib_1.__exportStar(require("./lib/errors/ArgumentError"), exports);
tslib_1.__exportStar(require("./lib/errors/Identifiers"), exports);
tslib_1.__exportStar(require("./lib/errors/PreconditionError"), exports);
tslib_1.__exportStar(require("./lib/errors/UserError"), exports);
tslib_1.__exportStar(require("./lib/parsers/Args"), exports);
tslib_1.__exportStar(require("./lib/parsers/Maybe"), exports);
tslib_1.__exportStar(require("./lib/parsers/Result"), exports);
tslib_1.__exportStar(require("./lib/plugins/Plugin"), exports);
tslib_1.__exportStar(require("./lib/plugins/PluginManager"), exports);
tslib_1.__exportStar(require("./lib/plugins/symbols"), exports);
tslib_1.__exportStar(require("./lib/SapphireClient"), exports);
tslib_1.__exportStar(require("./lib/structures/Argument"), exports);
tslib_1.__exportStar(require("./lib/structures/ArgumentStore"), exports);
tslib_1.__exportStar(require("./lib/structures/Command"), exports);
tslib_1.__exportStar(require("./lib/structures/CommandStore"), exports);
tslib_1.__exportStar(require("./lib/structures/Event"), exports);
tslib_1.__exportStar(require("./lib/structures/EventStore"), exports);
tslib_1.__exportStar(require("./lib/structures/ExtendedArgument"), exports);
tslib_1.__exportStar(require("./lib/structures/Precondition"), exports);
tslib_1.__exportStar(require("./lib/structures/PreconditionStore"), exports);
tslib_1.__exportStar(require("./lib/structures/StoreRegistry"), exports);
tslib_1.__exportStar(require("./lib/types/Enums"), exports);
tslib_1.__exportStar(require("./lib/types/Events"), exports);
tslib_1.__exportStar(require("./lib/utils/logger/ILogger"), exports);
tslib_1.__exportStar(require("./lib/utils/logger/Logger"), exports);
tslib_1.__exportStar(require("./lib/utils/preconditions/conditions/IPreconditionCondition"), exports);
tslib_1.__exportStar(require("./lib/utils/preconditions/conditions/PreconditionConditionAnd"), exports);
tslib_1.__exportStar(require("./lib/utils/preconditions/conditions/PreconditionConditionOr"), exports);
tslib_1.__exportStar(require("./lib/utils/preconditions/containers/PermissionsPrecondition"), exports);
tslib_1.__exportStar(require("./lib/utils/preconditions/IPreconditionContainer"), exports);
tslib_1.__exportStar(require("./lib/utils/preconditions/PreconditionContainerArray"), exports);
tslib_1.__exportStar(require("./lib/utils/preconditions/PreconditionContainerSingle"), exports);
exports.version = '1.0.0';
