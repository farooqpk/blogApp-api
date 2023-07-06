const { pool } = require("../config/db.js");
const { deleteCachedPosts } = require("../redis/deleteCachedPosts.js");

module.exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id; // Get the post ID from the request parameters

    // Delete the post from the database
    const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [postId];
    const result = await pool.query(query, values);

    // Check if a post with the given ID exists
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    //delete cached posts
await deleteCachedPosts()
    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting post",
    });
  }
};
