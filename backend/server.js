require("dotenv").config();

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./src/routes/taskRoutes");
const initDatabase = require("./src/db/init");

const app = express();

app.use(cors());
app.use(express.json());

initDatabase();

app.get("/", (req, res) => {
  res.json({
    message: "Task Management API is running",
  });
});

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});