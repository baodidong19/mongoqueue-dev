import {
  models
} from 'mongoose'
import {Mongo} from '../mongoqueue_model_mongo.connection'
import {JobSchema} from './job_model_mongo.schema'
import {MongooseConfiguration} from '../../mongoqueue.interface'

export class JobModelService{
  private config: MongooseConfiguration
  constructor(config:MongooseConfiguration)
  {
    this.config = config
  }

  private async getModelJob(){
    const name = 'Job'
    const mongoConnection = new Mongo(this.config)
    
    const modelName = this.config?.prefix?this.config.prefix + '-' + name:name;
    const modelJob = models[modelName] || await mongoConnection.createModel(name, JobSchema)
    return {modelJob}
  }

  public async getJob(id:string){
    const {modelJob} = await this.getModelJob()
    return await modelJob.findById(id)
  }

  public async getJobs(filter:any={}){    
      const {modelJob} = await this.getModelJob()
      return await modelJob.find(filter)
  }

  public async updateJob(id: string, data:any, allowNew=true){
    const {modelJob} = await this.getModelJob()
    return await modelJob.findByIdAndUpdate(id, data, { new: allowNew })
  }

  public async updateJobByFilter(filter: any, data:any, allowNew=true){
    const {modelJob} = await this.getModelJob()
    return await modelJob.findOneAndUpdate(filter, data, { new: allowNew, upsert:allowNew })
  }

  public async createJob(data:any){
    const {modelJob} = await this.getModelJob()
    return await modelJob.create(data)
  }

  public async removeJob(id:string){
    if (!!id)
    {
        const {modelJob} = await this.getModelJob()
        return await modelJob.findByIdAndRemove(id)
    }
    else
        return false
  }
}