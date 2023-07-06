const { pool } = require("../config/db.js");
const { getCachedPosts } = require("../redis/getCachedPosts.js");

module.exports.getPosts = async (req, res) => {
  try {
    const cachedPosts = await getCachedPosts()
    if (cachedPosts) {
      res.status(200).json(cachedPosts);
    } else {
      // Query the database to fetch all posts
      const query = "SELECT * FROM posts";
      const result = await pool.query(query);
      if (result.rows.length !== 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({ message: "post is empty" });
      }
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching posts",
    });
  }
};
