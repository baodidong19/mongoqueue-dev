import { __awaiter, __generator } from "tslib";
import { JobModel, QueueModel } from './mongoqueue_model_mongo';
var MongoQueueService = /** @class */ (function () {
    function MongoQueueService(config) {
        this.config = config;
        this.queueService = new QueueModel(this.config).getQueueModelService();
        this.jobService = new JobModel(this.config).getJobModelService();
    }
    Object.defineProperty(MongoQueueService, "Funcs", {
        get: function () {
            return MongoQueueService.funcs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MongoQueueService, "Func", {
        set: function (value) {
            for (var prop in value) {
                MongoQueueService.funcs[prop] = value[prop];
            }
        },
        enumerable: false,
        configurable: true
    });
    //Queue
    MongoQueueService.prototype.getQueues = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queueService.getQueues(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoQueueService.prototype.createQueue = function (data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var newQueue, filter, allowNew;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newQueue = {
                            code: data.code,
                            name: data.name,
                            status: (_a = data.status) !== null && _a !== void 0 ? _a : 1,
                            consumers: (_b = data.consumers) !== null && _b !== void 0 ? _b : 1
                        };
                        filter = {
                            code: data.code
                        };
                        allowNew = true;
                        return [4 /*yield*/, this.queueService.updateQueueByFilter(filter, newQueue, allowNew)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    MongoQueueService.prototype.updateQueue = function (filter, data, allowNew) {
        var _a, _b;
        if (allowNew === void 0) { allowNew = false; }
        return __awaiter(this, void 0, void 0, function () {
            var updateQueue;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        updateQueue = {
                            code: data.code,
                            name: data.name,
                            status: (_a = data.status) !== null && _a !== void 0 ? _a : 1,
                            consumers: (_b = data.consumers) !== null && _b !== void 0 ? _b : 1
                        };
                        return [4 /*yield*/, this.queueService.updateQueueByFilter(filter, updateQueue, allowNew)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    MongoQueueService.prototype.removeQueue = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queueService.removeQueue(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Job
    MongoQueueService.prototype.getJobs = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobService.getJobs(filter)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoQueueService.prototype.createJob = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, queues, allowNew, filter_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { code: data.queue_code,
                            status: 1 };
                        return [4 /*yield*/, this.getQueues(filter)
                            //queue is existed and status is active
                        ];
                    case 1:
                        queues = _a.sent();
                        if (!(queues.length > 0)) return [3 /*break*/, 3];
                        allowNew = true;
                        filter_1 = { org_id: data.org_id,
                            queue_code: data.queue_code,
                            msg: data.msg };
                        return [4 /*yield*/, this.jobService.updateJobByFilter(filter_1, data, allowNew)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    MongoQueueService.prototype.updateJob = function (filter, data, allowNew) {
        if (allowNew === void 0) { allowNew = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobService.updateJobByFilter(filter, data, allowNew)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoQueueService.prototype.removeJob = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobService.removeJob(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoQueueService.prototype.pickJob = function (queuecode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var filter, job, filterUpdate, data, allowNew;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filter = { queue_code: queuecode,
                            status: 0 };
                        return [4 /*yield*/, this.jobService.getJobs(filter)
                            //update job is processing
                        ];
                    case 1:
                        job = _b.sent();
                        filterUpdate = { _id: (_a = job[0]) === null || _a === void 0 ? void 0 : _a._id };
                        data = { status: 1 };
                        allowNew = false;
                        return [4 /*yield*/, this.jobService.updateJobByFilter(filterUpdate, data, allowNew)
                            //await this.jobService.updateJob(job._id, data , allowNew)
                        ];
                    case 2:
                        _b.sent();
                        //await this.jobService.updateJob(job._id, data , allowNew)
                        return [2 /*return*/, job];
                }
            });
        });
    };
    MongoQueueService.prototype.pingJob = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, data, allowNew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { _id: id };
                        data = {};
                        allowNew = false;
                        return [4 /*yield*/, this.jobService.updateJobByFilter(filter, data, allowNew)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoQueueService.prototype.updateAckJob = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, data, allowNew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { _id: id };
                        data = { status: 2 };
                        allowNew = false;
                        return [4 /*yield*/, this.jobService.updateJobByFilter(filter, data, allowNew)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoQueueService.funcs = {};
    return MongoQueueService;
}());
export { MongoQueueService };
//# sourceMappingURL=mongoqueue.service.js.map