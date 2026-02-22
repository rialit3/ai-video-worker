import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
});

const worker = new Worker(
  'videoQueue',
  async job => {
    console.log('Processing job:', job.data);
  },
  { connection }
);

console.log('Worker started');
