const { pool } = require("../config/db.js");
const { cachePosts } = require("../redis/cachePosts.js");

module.exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id; // Get the post ID from the request parameters
    const { title, content, author } = req.body;

    // Check if title, content, and author are provided
    if (title && content && author) {
      // Update the post in the database
      const query =
        "UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *";
      const values = [title, content, author, postId];
      const result = await pool.query(query, values);

      // Check if a post with the given ID exists
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
     
      const queryAll = "SELECT * FROM posts";
      const resultAll = await pool.query(queryAll);
      await cachePosts(resultAll.rows);
     
      // Send the updated post as the response
      res.json(result.rows[0]);
    } else {
      res.status(400).json({
        success: false,
        message: "Post fields should not be empty",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while updating post",
    });
  }
};
