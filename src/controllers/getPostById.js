const { pool } = require("../config/db.js");

module.exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id; // Get the post ID from the request parameters

    // Query the database to fetch the post by ID
    const query = 'SELECT * FROM posts WHERE id = $1';
    const values = [postId];
    const result = await pool.query(query, values);

    // Check if a post with the given ID exists
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Send the fetched post as the response
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching posts",
    });
  }
};
