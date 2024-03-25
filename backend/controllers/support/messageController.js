const Message = require("../../models/support/Message");
const Chat = require("../../models/support/Chat");

exports.sendMessage = async (req, res) => {
  const { chatId, sender, content, onModel } = req.body;

  try {
    const newMessage = new Message({
      chat: chatId,
      sender: sender,
      onModel: onModel,
      content: content,
    });

    await newMessage.save();

    // Update the chat document to include the new message
    await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: newMessage._id },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMessageHistory = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId }).sort("timestamp");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
