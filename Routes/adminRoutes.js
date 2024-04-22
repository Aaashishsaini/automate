// routes.js
const express = require("express");
const router = express.Router();
const { registerController } = require("../Controller/adminController");
const { loginController } = require("../Controller/adminController");
const { changePasswordController } = require("../Controller/adminController");

// Register route
router.post("/register", registerController);

// Login route
router.post("/login", loginController);

// Change password route
router.post("/change-password", changePasswordController);

module.exports = router;
