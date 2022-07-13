import { QueueModelService } from './queue_model_mongo.service';
var QueueModel = /** @class */ (function () {
    function QueueModel(config) {
        this.config = config;
    }
    QueueModel.prototype.getQueueModelService = function () {
        return new QueueModelService(this.config);
    };
    return QueueModel;
}());
export { QueueModel };
//# sourceMappingURL=index.js.map