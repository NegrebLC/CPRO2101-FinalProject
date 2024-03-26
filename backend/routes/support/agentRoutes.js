const express = require("express");
const router = express.Router();
const agentController = require("../../controllers/support/agentController");

//create a new agent
router.post(
  "/create",
  agentController.generateAgentId,
  agentController.createAgent
);
//gets a list of all agents
router.get("/find/all", agentController.getAllAgents);
//gets a agent by Id
router.get("/find/:agentId", agentController.getAgentById);
//deletes a agent
router.delete("/delete/:agentId", agentController.deleteAgent);
//logs in a agent
router.post("/login", agentController.agentLogin);
//example route for accessing restricted content
router.get(
  "/restricted",
  agentController.verifyToken,
  agentController.getAllAgents
);

module.exports = router;
