const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    UserId: {
      type: String,
      required: true,
    },
    HeadId: {
      type: Number,
      required: true,
    },
    ArmId: {
      type: Number,
      required: true,
    },
    BodyId: {
      type: Number,
      required: true,
    },
    LegId: {
      type: Number,
      required: true,
    },
    Happiness: {
      type: Number,
      required: true,
      min: 0,
    },
    Hunger: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;
