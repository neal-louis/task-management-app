const pool = require("../db/db");

const getTask = async (req, res) => {
  try {
    const { search, status } = req.query;

    let query = "SELECT * FROM tasks";
    const values = [];
    const conditions = [];

    if (search && search.trim() !== "") {
      values.push(`%${search.trim()}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }

    if (status === "completed") {
      conditions.push("completed = TRUE");
    } else if (status === "incomplete") {
      conditions.push("completed = FALSE");
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get tasks",
    });
  }
};

module.exports = getTask;