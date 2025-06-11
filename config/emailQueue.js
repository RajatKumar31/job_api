const { Queue } = require("bullmq");
const redisInstance = require("./redis");

const emailQueue = new Queue("emailQueue", { connection: redisInstance });
module.exports = emailQueue;
