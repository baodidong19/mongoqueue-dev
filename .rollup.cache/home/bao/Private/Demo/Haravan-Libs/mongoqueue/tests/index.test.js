import { __awaiter, __generator } from "tslib";
import 'jest';
import { MongoQueue, Mongo } from '../src';
var mongoConfig = {
    uris: 'mongodb://192.168.56.3:27017/partnership-test',
    prefix: 'partnership',
    debug: false,
    connectionOptions: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        //poolSize: 100
    }
};
describe('test mongoqueues', function () {
    var mongoConnection = new Mongo(mongoConfig);
    var mongoqueue = new MongoQueue(mongoConfig);
    var MongoQueueService = mongoqueue.getMongoQueueService();
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoConnection.disconectMongo()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); });
    test('register queue', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MongoQueueService.createQueue({
                        code: 'queue_sync_group_price_to_omni'
                    }).then(function (data) {
                        console.log(data);
                        expect(data).toBeDefined();
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
});
function registerMongoQueue(mongoqueue, queue_code, funcobject) {
    var _a;
    var MongoQueueService = mongoqueue.getMongoQueueService();
    MongoQueueService.Func = (_a = {}, _a[queue_code] = funcobject, _a);
    var data = {
        code: queue_code
    };
    MongoQueueService.mongoqueue.createQueue(data);
}
function monitorMongoQueue(mongoQueueService) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var queueFilter, queues, _i, queues_1, queue, processJobFilter, processJobs, readyJobFilter, readyJobs;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("run monitorMongoQueue");
                    queueFilter = {
                        status: 1
                    };
                    return [4 /*yield*/, mongoQueueService.getQueues(queueFilter)];
                case 1:
                    queues = _d.sent();
                    console.log('queues', (_a = queues.length) !== null && _a !== void 0 ? _a : 0);
                    _i = 0, queues_1 = queues;
                    _d.label = 2;
                case 2:
                    if (!(_i < queues_1.length)) return [3 /*break*/, 6];
                    queue = queues_1[_i];
                    processJobFilter = { status: 1, queue_code: queue.code };
                    return [4 /*yield*/, mongoQueueService.getJobs(processJobFilter)];
                case 3:
                    processJobs = _d.sent();
                    console.log('queue: ', queue.code, ':', queue.consumers, ' - processJobs ', (_b = processJobs.length) !== null && _b !== void 0 ? _b : 0);
                    if (!(processJobs.length < queue.consumers)) return [3 /*break*/, 5];
                    readyJobFilter = { status: 0, queue_code: queue.code };
                    return [4 /*yield*/, mongoQueueService.getJobs(readyJobFilter)];
                case 4:
                    readyJobs = _d.sent();
                    console.log('queue: ', queue.code, ' - readyJobs ', (_c = readyJobs.length) !== null && _c !== void 0 ? _c : 0);
                    if (readyJobs.length > 0) {
                        switch (queue.code) {
                            case 'queue_sync_group_price_to_omni':
                                return [2 /*return*/, ''];
                            case 'queue_import_manage_group_code':
                                return [2 /*return*/, ''];
                        }
                    }
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.test.js.map