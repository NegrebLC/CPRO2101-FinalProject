const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user_registration/userController");

//create a new user
router.post("/create", userController.generateUserId, userController.createUser);
//gets a list of all users
router.get("/find/all", userController.getAllUsers)
//gets a user by Id
router.get("/find/:userId", userController.getUserById);

module.exports = router;