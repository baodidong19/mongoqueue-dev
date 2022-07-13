export var QueueStatus;
(function (QueueStatus) {
    QueueStatus[QueueStatus["Deactive"] = 0] = "Deactive";
    QueueStatus[QueueStatus["Active"] = 1] = "Active";
})(QueueStatus || (QueueStatus = {}));
export var QueueSyncStatus;
(function (QueueSyncStatus) {
    QueueSyncStatus[QueueSyncStatus["Success"] = 0] = "Success";
    QueueSyncStatus[QueueSyncStatus["StartSync"] = 1] = "StartSync";
    QueueSyncStatus[QueueSyncStatus["Syncing"] = 2] = "Syncing";
    QueueSyncStatus[QueueSyncStatus["Error"] = 3] = "Error";
    QueueSyncStatus[QueueSyncStatus["NotExisted"] = 4] = "NotExisted";
})(QueueSyncStatus || (QueueSyncStatus = {}));
//# sourceMappingURL=queue_model_mongo.enum.js.map