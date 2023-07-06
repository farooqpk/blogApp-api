const { redisClient } = require("../index.js");

module.exports.cachePosts = async (posts) => {
   try {
    await redisClient.setEx("posts", 3600, JSON.stringify(posts))
   } catch (error) {
    throw new Error("Error while caching posts: " + error);
   }
  };





