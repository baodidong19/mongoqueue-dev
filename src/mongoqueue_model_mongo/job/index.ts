import { JobModelService } from './job_model_mongo.service'
import {MongooseConfiguration} from '../../mongoqueue.interface'

export class JobModel
{
    private config: MongooseConfiguration

    constructor(config: MongooseConfiguration)
    {
        this.config = config
    }
 
    public getJobModelService(){
        return new JobModelService(this.config)
    }
    
}