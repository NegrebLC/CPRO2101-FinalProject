const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  _id: Number,
  agentName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Agent", agentSchema);
