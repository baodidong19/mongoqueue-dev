import { __awaiter, __generator } from "tslib";
import { models } from 'mongoose';
import { Mongo } from '../mongoqueue_model_mongo.connection';
import { QueueSchema } from './queue_model_mongo.schema';
var QueueModelService = /** @class */ (function () {
    function QueueModelService(config) {
        if (config)
            this.config = config;
    }
    Object.defineProperty(QueueModelService.prototype, "Config", {
        set: function (value) {
            this.config = value;
        },
        enumerable: false,
        configurable: true
    });
    QueueModelService.prototype.getModelQueue = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var name, mongoConnection, modelName, modelQueue, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        name = 'Queue';
                        mongoConnection = new Mongo(this.config);
                        modelName = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.prefix) ? this.config.prefix + '-' + name : name;
                        _b = models[modelName];
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, mongoConnection.createModel(name, QueueSchema)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        modelQueue = _b;
                        return [2 /*return*/, { modelQueue: modelQueue }];
                }
            });
        });
    };
    QueueModelService.prototype.getQueue = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var modelQueue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelQueue()];
                    case 1:
                        modelQueue = (_a.sent()).modelQueue;
                        return [4 /*yield*/, modelQueue.findById(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    QueueModelService.prototype.getQueues = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var modelQueue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelQueue()];
                    case 1:
                        modelQueue = (_a.sent()).modelQueue;
                        return [4 /*yield*/, modelQueue.find(filter)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    QueueModelService.prototype.updateQueue = function (id, data, allowNew) {
        if (allowNew === void 0) { allowNew = true; }
        return __awaiter(this, void 0, void 0, function () {
            var modelQueue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelQueue()];
                    case 1:
                        modelQueue = (_a.sent()).modelQueue;
                        return [4 /*yield*/, modelQueue.findByIdAndUpdate(id, data, { new: allowNew })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    QueueModelService.prototype.updateQueueByFilter = function (filter, data, allowNew) {
        if (allowNew === void 0) { allowNew = true; }
        return __awaiter(this, void 0, void 0, function () {
            var modelQueue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelQueue()];
                    case 1:
                        modelQueue = (_a.sent()).modelQueue;
                        return [4 /*yield*/, modelQueue.findOneAndUpdate(filter, data, { new: allowNew, upsert: allowNew, useFindAndModify: false })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    QueueModelService.prototype.createQueue = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var modelQueue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelQueue()];
                    case 1:
                        modelQueue = (_a.sent()).modelQueue;
                        return [4 /*yield*/, modelQueue.create(data)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    QueueModelService.prototype.removeQueue = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var modelQueue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!id) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getModelQueue()];
                    case 1:
                        modelQueue = (_a.sent()).modelQueue;
                        return [4 /*yield*/, modelQueue.findByIdAndRemove(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    return QueueModelService;
}());
export { QueueModelService };
//# sourceMappingURL=queue_model_mongo.service.js.map