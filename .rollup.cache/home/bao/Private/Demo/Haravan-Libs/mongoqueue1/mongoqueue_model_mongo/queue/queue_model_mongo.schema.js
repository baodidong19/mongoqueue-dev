import { Schema } from 'mongoose';
export var QueueSchema = new Schema({
    org_id: {
        type: Number
    },
    code: {
        type: String
    },
    name: {
        type: String
    },
    status: {
        type: Number, //0 - unactive, 1- active
    },
    consumers: {
        type: Number
    }
}, {
    timestamps: {
        createdAt: 'doc_created_at',
        updatedAt: 'doc_updated_at'
    }
});
//# sourceMappingURL=queue_model_mongo.schema.js.map