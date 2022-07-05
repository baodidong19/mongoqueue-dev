import {
    Schema
  } from 'mongoose'

import {COLLECTION_TTL} from './job_model_mongo.constant'

 export const JobSchema = new Schema({
    org_id: {
      type: Number
    },
    queue_code: {
      type: String
    },
    queue_name: {
      type: String
    },
    name: {
      type: String
    },
    msg: {
      type: Schema.Types.Mixed
    },
    status:{
      type: Number,
      default:0
    },
    err_msg: {
      type: Schema.Types.Mixed
    },
  },
  {
    timestamps: {
      createdAt: 'doc_created_at',
      updatedAt: 'doc_updated_at'
    }
  })

  // JobSchema.index({createdAt: 1},{expireAfterSeconds: 3600})

  JobSchema.index(
    {
      'status': 1
    },
    {
      expireAfterSeconds: COLLECTION_TTL,
      partialFilterExpression: {
        status: 2
    }
    }
  )