require("dotenv").config();
const { Worker } = require("bullmq");
const Redis = require("ioredis");

const connection = new Redis(process.env.REDIS_URL);

const worker = new Worker(
  "video-generation",
  async (job) => {
    const { projectId, topic } = job.data;

    console.log("Processing project:", projectId);
    console.log("Topic:", topic);

    // Здесь позже будет:
    // 1. Разбивка темы
    // 2. Генерация аудио
    // 3. Генерация teacher video
    // 4. Merge с gameplay

    return true;
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log("Completed:", job.id);
});