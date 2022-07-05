import 'jest'
import {MongoQueue} from '.'
import {MongooseConfiguration} from './mongoqueue.interface'

const mongoConfig:MongooseConfiguration = {
  uris: 'mongodb://192.168.56.3:27017/partnership-test',
  prefix: 'partnership',
  debug: false,
  connectionOptions: {
    useNewUrlParser: true, // Must pass port to URI
    useCreateIndex: true, // To turn off Mongoose warning, use createIndex() instead ensureIndex()
    useUnifiedTopology: true, // New Mongo monitoring
    useFindAndModify: false,
    //poolSize: 100
  }
}

describe('test mongoqueues', () =>{

  const mongoqueue = new MongoQueue(mongoConfig)
  const MongoQueueService = mongoqueue.getMongoQueueService()
  
  test('register queue', async () => {
    return await MongoQueueService.createQueue({
      code:'queue_sync_group_price_to_omni'
  }).then(data => {
      console.log(data)
      expect(data).toBeDefined()
    })
  })
})

function registerMongoQueue(mongoqueue:any, queue_code:string, funcobject:any)
{
  const MongoQueueService = mongoqueue.getMongoQueueService()
    MongoQueueService.Func={[queue_code]:funcobject}
    const data = {
        code:queue_code
    }
    MongoQueueService.mongoqueue.createQueue(data)
}

async function monitorMongoQueue(mongoQueueService: any)
{
    console.log("run monitorMongoQueue")
        
    //const mongoqueue = new MongoQueue(appConfig.mongoose).getMongoQueueService()
    //check job is processing for each queue
    const queueFilter = {
      status:1
    }
    const queues = await mongoQueueService.getQueues(queueFilter)
    console.log('queues', queues.length ?? 0)
    for (let queue of queues)
    {
      //check processing job < consumers
      const processJobFilter = {status:1, queue_code:queue.code}
      const processJobs = await mongoQueueService.getJobs(processJobFilter)
      console.log('queue: ',queue.code,':',queue.consumers,' - processJobs ', processJobs.length ?? 0)
      if (processJobs.length < queue.consumers)
      {
        const readyJobFilter = {status:0, queue_code:queue.code}
        const readyJobs = await mongoQueueService.getJobs(readyJobFilter)
        console.log('queue: ',queue.code,' - readyJobs ', readyJobs.length ?? 0)
        if (readyJobs.length > 0)
        {
          switch(queue.code)
          {
            case 'queue_sync_group_price_to_omni':
                return ''
            case 'queue_import_manage_group_code':
               return ''
          }
        }          
      }
    }   
        
}

