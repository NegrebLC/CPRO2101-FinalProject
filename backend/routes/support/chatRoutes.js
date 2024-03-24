const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/support/chatController");

// Start a new chat session
router.post("/start", chatController.startChat);

// Add a message to a chat session
router.post("/:chatId/message", chatController.addMessageToChat);

// Close a chat session
router.post("/:chatId/close", chatController.closeChat);

module.exports = router;
