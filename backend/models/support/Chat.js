const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: Date,
  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active",
  },
});

module.exports = mongoose.model("Chat", chatSchema);
