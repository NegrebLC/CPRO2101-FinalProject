const express = require("express");
const router = express.Router();
const creatureController = require("../../controllers/creature/creatureController");

// Define the Creature routes
router.post("/create", creatureController.createCreature);
router.get("/get/all", creatureController.getAllCreatures);
router.get("/get/:id", creatureController.getCreatureById);
router.put("/update/:id", creatureController.updateCreature);
router.delete("/delete/:id", creatureController.deleteCreature);

module.exports = router;
