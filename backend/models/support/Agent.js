const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Agent", agentSchema);
