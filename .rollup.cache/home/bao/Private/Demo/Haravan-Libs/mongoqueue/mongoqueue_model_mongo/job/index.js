import { JobModelService } from './job_model_mongo.service';
var JobModel = /** @class */ (function () {
    function JobModel(config) {
        this.config = config;
    }
    JobModel.prototype.getJobModelService = function () {
        return new JobModelService(this.config);
    };
    return JobModel;
}());
export { JobModel };
//# sourceMappingURL=index.js.map