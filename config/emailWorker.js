const { Worker } = require("bullmq");
const redisInstance = require("./redis");

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email } = job.data;
    try {
      console.log("Inside worker, email : ", email);
      // send email here
    } catch (err) {
      console.log(err.message);
    }
  },
  { connection: redisInstance },
);

emailWorker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

emailWorker.on("failed", (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});

module.exports = emailWorker;
