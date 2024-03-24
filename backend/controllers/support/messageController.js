const Message = require("../../models/support/Message");

exports.getMessageHistory = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).sort(
      "timestamp"
    );
    res.send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
};
