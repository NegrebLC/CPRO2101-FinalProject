const Chat = require("../../models/support/Chat");
const Message = require("../../models/support/Message");
const User = require("../../models/user/User");

exports.startChat = async (req, res) => {
  // Assumes req.body contains 'userId' and optionally 'agentId'
  const { userId, agentId } = req.body;
  console.log("Trying to start chat...");

  try {
    const newChat = new Chat({
      participants: {
        user: userId,
        agent: agentId,
      },
      messages: [],
      status: "active",
    });

    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    console.log("Failed to start chat");
    console.log(error);
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

exports.getChatsByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    // Step 1: Find the user's ID by their username
    const user = await User.findOne({ username: username }, "_id");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const userId = user._id;

    // Step 2: Find all chats associated with the found user ID
    const chats = await Chat.find({ "participants.user": userId });

    res.status(200).json(chats);
  } catch (error) {
    console.error(`Error fetching chats for username ${username}:`, error);
    res.status(500).json({ error: error.message });
  }
};

exports.getActiveChats = async (req, res) => {
  try {
    const activeChats = await Chat.find({ status: "active" });
    res.json(activeChats);
  } catch (error) {
    console.error(`Error fetching chats: `, error);
    res.status(500).json({ error: error.message });
  }
};
