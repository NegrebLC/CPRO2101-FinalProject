const express = require("express");
const router = express.Router();
const agentController = require("../../controllers/support/agentController");

// Create a new agent
router.post("/", agentController.createAgent);

// Get an agent by ID
router.get("/:agentId", agentController.getAgent);

module.exports = router;
