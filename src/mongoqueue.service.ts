import {JobModel, QueueModel} from './mongoqueue_model_mongo'

import {MongooseConfiguration} from './mongoqueue.interface'
import { MongoQueue } from '.'

export class MongoQueueService{
    
    private static funcs:any = {}

    public static get Funcs()
    {
        return MongoQueueService.funcs
    }

    public static set Func(value:any)
    {
        for (let prop in value)
        {
          MongoQueueService.funcs[prop] = value[prop]
        }    
    } 
    private queueService: any
    private jobService: any

    private config:MongooseConfiguration
    
    constructor(config:MongooseConfiguration)
    {
      this.config = config
      this.queueService = new QueueModel(this.config).getQueueModelService()
      this.jobService = new JobModel(this.config).getJobModelService()
    }  
    
    //Queue
    public async getQueues(filter: any) {
      return await this.queueService.getQueues(filter)
    }

    public async createQueue(data:any) {
      const newQueue={
        code: data.code,
        name: data.name,
        status: data.status ?? 1,
        consumers:data.consumers ?? 1}
      //return await this.queueService.createQueue(newQueue)
      const filter = {
        code:data.code
      }
      const allowNew = true
      return await this.queueService.updateQueueByFilter(filter, newQueue, allowNew)
    }

    public async updateQueue(filter: any, data: any, allowNew=false) {
      const updateQueue={
        code: data.code,
        name: data.name,
        status:data.status ?? 1,
        consumers:data.consumers ?? 1}
      return await this.queueService.updateQueueByFilter(filter, updateQueue, allowNew)
    }

    public async removeQueue(id:string) {
      return await this.queueService.removeQueue(id)      
    }

    //Job
    public async getJobs(filter: any) {
      return await this.jobService.getJobs(filter)
    }

    public async createJob(data:any) {
      //get queues 
      const filter = {code:data.queue_code,
      status: 1}
      const queues = await this.getQueues(filter)

      //queue is existed and status is active
      if (queues.length > 0)
      {
        //upsert job
        const allowNew = true
        const filter = {org_id:data.org_id,
        queue_code:data.queue_code,
        msg: data.msg}
        return await this.jobService.updateJobByFilter(filter, data, allowNew)
      }        
      else
        return null
    }

    public async updateJob(filter: any, data: any, allowNew=false) {
      return await this.jobService.updateJobByFilter(filter,data,allowNew)
    }

    public async removeJob(id: string) {
      return await this.jobService.removeJob(id)
    }

    public async pickJob(queuecode: string) {
      /*
        check length of queue
        check processing job of org_id
        get job with status ready 
      */
      const filter = {queue_code:queuecode,
      status:0}
      //MongoQueueService.funcs[queuecode]
      const job = await this.jobService.getJobs(filter)
      
      //update job is processing
      const filterUpdate = {_id:job[0]?._id}
      const data = {status:1}
      const allowNew = false
      await this.jobService.updateJobByFilter(filterUpdate, data , allowNew)
      //await this.jobService.updateJob(job._id, data , allowNew)

      return job
    }

    public async pingJob(id: string) {
      const filter = {_id:id}
      const data = {}
      const allowNew = false

      return await this.jobService.updateJobByFilter(filter, data , allowNew)
    }

    public async updateAckJob(id: string) {
      const filter = {_id:id}
      const data = {status:2}
      const allowNew = false

      return await this.jobService.updateJobByFilter(filter, data , allowNew)
    }
}