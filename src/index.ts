import {MongoQueueService} from './mongoqueue.service'
import { MongooseConfiguration } from "./mongoqueue.interface";
export * from './mongoqueue_model_mongo'

export {MongoQueueService}
export type {MongooseConfiguration}

export class MongoQueue{
    
    private mongooseConfig:MongooseConfiguration

    constructor(mongooseConfig:MongooseConfiguration)
    {
        this.mongooseConfig = mongooseConfig
    }

    public getMongoQueueService()
    {
        return new MongoQueueService(this.mongooseConfig)
    }

    public addQueue(queuname:string, funcobject: any)
    {
        if (!!funcobject)
        {
            console.log('add queue function')
            
        }
        else
        {
            console.log('khong ton tai queue function')
        }
    }
}