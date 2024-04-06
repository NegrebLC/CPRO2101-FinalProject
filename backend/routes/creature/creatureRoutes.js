const express = require("express");
const router = express.Router();
const creatureController = require("../../controllers/creature/creatureController");

// Define the Creature routes
router.post("/", creatureController.createCreature);
router.get("/", creatureController.getAllCreatures);
router.get("/:id", creatureController.getCreatureById);
router.put("/:id", creatureController.updateCreature);
router.delete("/:id", creatureController.deleteCreature);

module.exports = router;
