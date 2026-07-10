const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controllers/auth.controller");

// Register User
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Delete Account
router.delete("/profile", protect, deleteAccount);

module.exports = router;