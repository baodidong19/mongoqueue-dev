import { MongoQueueService } from './mongoqueue.service';
export { MongoQueueService };
var MongoQueue = /** @class */ (function () {
    function MongoQueue(mongooseConfig) {
        this.mongooseConfig = mongooseConfig;
    }
    MongoQueue.prototype.getMongoQueueService = function () {
        return new MongoQueueService(this.mongooseConfig);
    };
    MongoQueue.prototype.addQueue = function (queuname, funcobject) {
        if (!!funcobject) {
            console.log('add queue function');
        }
        else {
            console.log('khong ton tai queue function');
        }
    };
    return MongoQueue;
}());
export { MongoQueue };
//# sourceMappingURL=index.js.map