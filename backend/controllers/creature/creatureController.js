const Creature = require("../../models/creature/Creature");

// Create a new creature
exports.createCreature = async (req, res) => {
  try {
    const creature = new Creature({
      Name: req.body.Name,
      UserId: req.body.UserId,
      HeadId: req.body.HeadId,
      ArmId: req.body.ArmId,
      BodyId: req.body.BodyId,
      LegId: req.body.LegId,
      Happiness: req.body.Happiness,
      Hunger: req.body.Hunger,
    });

    const savedCreature = await creature.save();
    res.status(201).json(savedCreature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all creatures
exports.getAllCreatures = async (req, res) => {
  try {
    const creatures = await Creature.find();
    res.json(creatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single creature by ID
exports.getCreatureById = async (req, res) => {
  try {
    const creature = await Creature.findById(req.params.id);
    if (creature == null) {
      return res.status(404).json({ message: "Cannot find creature" });
    }
    res.json(creature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a creature by ID
exports.updateCreature = async (req, res) => {
  try {
    const creature = await Creature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (creature == null) {
      return res.status(404).json({ message: "Cannot find creature" });
    }
    res.json(creature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a creature by ID
exports.deleteCreature = async (req, res) => {
  try {
    const creature = await Creature.findByIdAndDelete(req.params.id);
    if (creature == null) {
      return res.status(404).json({ message: "Cannot find creature" });
    }
    res.json({ message: "Deleted Creature" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
