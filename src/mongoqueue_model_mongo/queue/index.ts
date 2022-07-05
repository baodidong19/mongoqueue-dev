import { QueueModelService } from './queue_model_mongo.service'
import {MongooseConfiguration} from '../../mongoqueue.interface'

export class QueueModel
{
    private config: MongooseConfiguration
    constructor(config:MongooseConfiguration)
    {
        this.config = config
    }
    
    public getQueueModelService(){
        return new QueueModelService(this.config)
    }
    
}