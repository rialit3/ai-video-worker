require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Queue } = require("bullmq");
const Redis = require("ioredis");

const app = express();
app.use(cors());
app.use(express.json());

const connection = new Redis(process.env.REDIS_URL);
const videoQueue = new Queue("video-generation", { connection });

app.post("/generate", async (req, res) => {
  const { projectId, topic } = req.body;

  await videoQueue.add("generate-series", {
    projectId,
    topic,
  });

  res.json({ status: "queued" });
});

app.listen(3000, () => {
  console.log("Worker running on port 3000");
});