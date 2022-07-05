import {
    Schema
  } from 'mongoose'

 export const QueueSchema = new Schema({
    org_id: {
      type: Number
    },
    code: {
      type: String
    },
    name: {
      type: String
    },
    status:{
      type: Number,//0 - unactive, 1- active
    },
    consumers:{
      type:Number
    }
  },
  {
    timestamps: {
      createdAt: 'doc_created_at',
      updatedAt: 'doc_updated_at'
    }
  })