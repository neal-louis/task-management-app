const express = require("express");

const getTask = require("../controllers/getTask");
const createTask = require("../controllers/createTask");
const updateTask = require("../controllers/updateTask");
const deleteTask = require("../controllers/deleteTask");

const router = express.Router();

router.get("/", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;