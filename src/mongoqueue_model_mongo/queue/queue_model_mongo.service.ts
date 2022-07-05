import {
  models
} from 'mongoose'
import {Mongo} from '../mongoqueue_model_mongo.connection'
import {QueueSchema} from './queue_model_mongo.schema'
import {MongooseConfiguration} from '../../mongoqueue.interface'

export class QueueModelService{
  private config!: MongooseConfiguration
  constructor(config?:MongooseConfiguration)
  {
    if (config)
      this.config = config
  }

  public set Config(value:MongooseConfiguration)
  {
    this.config = value
  }

  private async getModelQueue(){
    const name = 'Queue'
    const mongoConnection = new Mongo(this.config)
    
    const modelName = this.config?.prefix?this.config.prefix + '-' + name:name;
    const modelQueue = models[modelName] || await mongoConnection.createModel(name, QueueSchema)
    return {modelQueue}
  }

  public async getQueue(id:number){
    const {modelQueue} = await this.getModelQueue()
    return await modelQueue.findById(id)
  }

  public async getQueues(filter:any={}){    
      const {modelQueue} = await this.getModelQueue()
      return await modelQueue.find(filter)
  }

  public async updateQueue(id: number, data:any, allowNew=true){
    const {modelQueue} = await this.getModelQueue()
    return await modelQueue.findByIdAndUpdate(id, data, { new: allowNew })
  }

  public async updateQueueByFilter(filter: any, data:any, allowNew=true){
    const {modelQueue} = await this.getModelQueue()
    return await modelQueue.findOneAndUpdate(filter, data, { new: allowNew, upsert: allowNew })
  }

  public async createQueue(data:any){
    const {modelQueue} = await this.getModelQueue()
    return await modelQueue.create(data)
  }

  public async removeQueue(id:string){
    if (!!id)
    {
        const {modelQueue} = await this.getModelQueue()
        return await modelQueue.findByIdAndRemove(id)
    }
    else
        return false
  }
}