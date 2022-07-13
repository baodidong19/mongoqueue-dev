export var JobStatus;
(function (JobStatus) {
    JobStatus[JobStatus["Deactive"] = 0] = "Deactive";
    JobStatus[JobStatus["Active"] = 1] = "Active";
})(JobStatus || (JobStatus = {}));
export var JobSyncStatus;
(function (JobSyncStatus) {
    JobSyncStatus[JobSyncStatus["Success"] = 0] = "Success";
    JobSyncStatus[JobSyncStatus["StartSync"] = 1] = "StartSync";
    JobSyncStatus[JobSyncStatus["Syncing"] = 2] = "Syncing";
    JobSyncStatus[JobSyncStatus["Error"] = 3] = "Error";
    JobSyncStatus[JobSyncStatus["NotExisted"] = 4] = "NotExisted";
})(JobSyncStatus || (JobSyncStatus = {}));
//# sourceMappingURL=job_model_mongo.enum.js.map