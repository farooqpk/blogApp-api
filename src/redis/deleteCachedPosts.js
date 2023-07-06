const { redisClient } = require("../index.js");

module.exports.deleteCachedPosts = async (posts) => {
   try {
    await redisClient.del("posts")
    return
   } catch (error) {
    throw new Error("Error while deleting posts: " + error);
   }
  };