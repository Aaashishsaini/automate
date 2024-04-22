// changePasswordController.js
const userModel = require("../Modal/adminModal");

exports.changePasswordController = async (req, res) => {
  try {
    const { name, password, newPassword } = req.body;
    if (!name || !password || !newPassword) {
      return res.status(400).send({
        message: "Name, current password, and new password are required fields",
      });
    }

    // Find user by name and password
    const user = await userModel.findOne({ name, password });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found or invalid credentials" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password changed successfully",
      user,
    });
  } catch (error) {
    console.error("Error in changing password:", error);
    res.status(500).send({
      success: false,
      message: "Error in changing password",
      error: error.message,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .send({ message: "Name and password are required fields" });
    }

    // Find user by name and password
    const user = await userModel.findOne({ name, password });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

exports.registerController = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .send({ message: "Name and password are required fields" });
    }

    // Create new user
    const user = await new userModel({
      name,
      password,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};
