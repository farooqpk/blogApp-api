const { redisClient } = require("../index.js");

module.exports.getCachedPosts = async () => {
  try {
    const posts = await redisClient.get("posts")
    if(posts){
        return JSON.parse(posts);
    }else{
        console.log('there is no post');
        return null
    }
  } catch (error) {
    throw new Error("Error retrieving cached posts: " + error);
  }
};
