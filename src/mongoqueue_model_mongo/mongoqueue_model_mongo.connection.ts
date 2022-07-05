import {
  connect,
  connection,
  model as createModel,
  set,
  model,
  Schema
} from 'mongoose'

import {MongooseConfiguration} from '../mongoqueue.interface'

export class Mongo
{
  private static isInitialize: boolean = false
  private static config: MongooseConfiguration
  private static count: number = 0

  constructor(config:MongooseConfiguration){
    if (config)
      this.setConfig(config)
  }

  public setConfig(config:MongooseConfiguration) {
    Mongo.config = config
    const databaseURL = config.uris || ''
    const mongooseURL = new URL(databaseURL)
    const logURL: string = `${mongooseURL.protocol}//${mongooseURL.host}${mongooseURL.pathname}`

    
    if (!Mongo.isInitialize) { 
      
      Mongo.count ++    
      console.log('call db: ' + Mongo.count)

      connect(databaseURL as string, Mongo.config?.connectionOptions)
      console.log("Mongoose Connection Established")

      connection.on('open', () =>
        console.log(logURL, 'MongooseConnected'))

      connection.on('reconnected', () =>
        console.log(logURL, 'MongooseReconnected'))

      connection.on('disconnected', () =>
        console.log(logURL, 'MongooseDisconnected'))

      connection.on('close', () =>
        console.log(logURL, 'MongooseClose'))

      connection.on('error', err =>{
        console.log(err)
      })
    }
    Mongo.isInitialize = true

    return {
      module: Mongo
    }
  }

  public async createModel(modelName:string, modelSchema:Schema)
  {
    return model(Mongo.config.prefix + '-' + modelName, modelSchema) 
  }
}