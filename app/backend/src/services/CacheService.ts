const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://@redis_compose:6379'
});

export const cacheData = async (key: any, data: any) => {
  await redisClient.connect();
  await redisClient.set(key, JSON.stringify(data));
  console.log('Data persisted in Redis!');
  await redisClient.disconnect();
};

export const getCached = async (key: any) => {
  await redisClient.connect();
  const cachedData = await redisClient.get(key);
  await redisClient.disconnect();
  return cachedData;
};

module.exports = {
  cacheData,
  getCached,
};