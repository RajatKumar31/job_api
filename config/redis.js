const IORedis = require("ioredis");

const redisInstance = new IORedis({ maxRetriesPerRequest: null });
module.exports = redisInstance;
