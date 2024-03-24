const mongoose = require("mongoose");

// Temp model with the purpose of testing User Support ***********
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
