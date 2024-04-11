const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  sender: {
    type: Number,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    required: true,
    enum: ["User", "Agent"],
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
