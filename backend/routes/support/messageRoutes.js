const express = require("express");
const router = express.Router();
const messageController = require("../../controllers/support/messageController");

// Get message history for a chat
router.get("/:chatId/messages", messageController.getMessageHistory);

module.exports = router;
