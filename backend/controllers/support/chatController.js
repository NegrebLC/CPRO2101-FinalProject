const Chat = require("../../models/support/Chat");
const Message = require("../../models/support/Message");

exports.startChat = async (req, res) => {
  // Assumes req.body contains 'userId' and optionally 'agentId'
  const { userId, agentId } = req.body;

  try {
    const newChat = new Chat({
      participants: {
        user: userId,
        agent: agentId || null, // Can be null initially if not assigned
      },
      messages: [],
      status: "active",
    });

    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.closeChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { status: "closed" },
      { new: true }
    );
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChatHistory = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findById(chatId).populate("messages");
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
