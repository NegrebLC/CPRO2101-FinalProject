const express = require("express");
const router = express.Router();
const userController = require("../../controllers/support/userController");

// Create a new user
router.post("/", userController.createUser);

// Get a user by ID
router.get("/:userId", userController.getUser);

module.exports = router;
