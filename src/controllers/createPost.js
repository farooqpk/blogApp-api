const { pool } = require("../config/db.js");
const { cachePosts } = require("../redis/cachePosts.js");

module.exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    console.log(title, content, author);
    if (title && content && author) {
      // Insert the new post into the database
      const query =
        "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *";
      const values = [title, content, author];
      const result = await pool.query(query, values);

      const queryAll = "SELECT * FROM posts";
      const resultAll = await pool.query(queryAll);
      //add to redis
      await cachePosts(resultAll.rows);
      res.status(201).json(result.rows[0]);
      
    } else {
      res
        .status(400)
        .json({ success: false, message: "post fields should not be empty" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error while adding post",
    });
  }
};
