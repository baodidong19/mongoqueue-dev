import { __awaiter, __generator } from "tslib";
import { models } from 'mongoose';
import { Mongo } from '../mongoqueue_model_mongo.connection';
import { JobSchema } from './job_model_mongo.schema';
var JobModelService = /** @class */ (function () {
    function JobModelService(config) {
        this.config = config;
    }
    JobModelService.prototype.getModelJob = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var name, mongoConnection, modelName, modelJob, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        name = 'Job';
                        mongoConnection = new Mongo(this.config);
                        modelName = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.prefix) ? this.config.prefix + '-' + name : name;
                        _b = models[modelName];
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, mongoConnection.createModel(name, JobSchema)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        modelJob = _b;
                        return [2 /*return*/, { modelJob: modelJob }];
                }
            });
        });
    };
    JobModelService.prototype.getJob = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var modelJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelJob()];
                    case 1:
                        modelJob = (_a.sent()).modelJob;
                        return [4 /*yield*/, modelJob.findById(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobModelService.prototype.getJobs = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var modelJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelJob()];
                    case 1:
                        modelJob = (_a.sent()).modelJob;
                        return [4 /*yield*/, modelJob.find(filter)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobModelService.prototype.updateJob = function (id, data, allowNew) {
        if (allowNew === void 0) { allowNew = true; }
        return __awaiter(this, void 0, void 0, function () {
            var modelJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelJob()];
                    case 1:
                        modelJob = (_a.sent()).modelJob;
                        return [4 /*yield*/, modelJob.findByIdAndUpdate(id, data, { new: allowNew })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobModelService.prototype.updateJobByFilter = function (filter, data, allowNew) {
        if (allowNew === void 0) { allowNew = true; }
        return __awaiter(this, void 0, void 0, function () {
            var modelJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelJob()];
                    case 1:
                        modelJob = (_a.sent()).modelJob;
                        return [4 /*yield*/, modelJob.findOneAndUpdate(filter, data, { new: allowNew, upsert: allowNew, useFindAndModify: false })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobModelService.prototype.createJob = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var modelJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelJob()];
                    case 1:
                        modelJob = (_a.sent()).modelJob;
                        return [4 /*yield*/, modelJob.create(data)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JobModelService.prototype.removeJob = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var modelJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!id) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getModelJob()];
                    case 1:
                        modelJob = (_a.sent()).modelJob;
                        return [4 /*yield*/, modelJob.findByIdAndRemove(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    return JobModelService;
}());
export { JobModelService };
//# sourceMappingURL=job_model_mongo.service.js.map