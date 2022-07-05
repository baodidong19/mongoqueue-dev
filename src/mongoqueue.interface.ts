import ConnectionOptions from "mongoose"

export interface QueueData {
  
  _id?: number
  
  code?: string
  
  name?: string

  status?: number
    
  doc_created_at?: Date

  doc_updated_at?: Date
}

export interface JobData {
  
  _id?: number
  
  queue_code?: string
  
  queue_name?: string

  msg?: any

  status?: number

  err_msg?: any
  
  doc_created_at?: Date

  doc_updated_at?: Date
}

export interface MongooseConfiguration {
  uris: string
    
  prefix?: string

  debug?: boolean
  
  connectionOptions?: any
}