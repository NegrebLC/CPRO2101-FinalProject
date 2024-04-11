const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/support/chatController");
const messageController = require("../../controllers/support/messageController");

// Chat routes
router.post("/chats/start", chatController.startChat);
router.post("/chats/:chatId/close", chatController.closeChat);
router.get("/chats/:chatId/messages", chatController.getChatHistory);
router.get("/chats/user/:username", chatController.getChatsByUsername);
router.get("/chats/active", chatController.getActiveChats);

// Message routes
router.post("/messages/send", messageController.sendMessage);
router.get("/messages/:chatId/history", messageController.getMessageHistory);

module.exports = router;
