const Chat = require("../../models/support/Chat");
const Message = require("../../models/support/Message");

exports.startChat = async (req, res) => {
  try {
    const chat = new Chat({
      participants: {
        user: req.body.userId,
        agent: req.body.agentId,
      },
      messages: [],
      status: "active",
    });
    await chat.save();
    res.status(201).send(chat);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addMessageToChat = async (req, res) => {
  try {
    const message = new Message({
      chat: req.params.chatId,
      sender: req.body.senderId,
      onModel: req.body.senderType,
      content: req.body.content,
    });
    await message.save();

    // Add message to chat
    const chat = await Chat.findById(req.params.chatId);
    chat.messages.push(message._id);
    await chat.save();

    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.closeChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(
      req.params.chatId,
      { status: "closed" },
      { new: true }
    );
    if (!chat) {
      return res.status(404).send();
    }
    res.send(chat);
  } catch (error) {
    res.status(500).send(error);
  }
};
