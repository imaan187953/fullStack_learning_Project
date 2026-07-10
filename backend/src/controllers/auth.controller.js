const User = require("../models/user.model");
const List = require("../models/list.model");
const ListItem = require("../models/listItem.model");
const Rating = require("../models/rating.model");
const Review = require("../models/review.model");
const bcrypt = require("bcryptjs");


// Register User
const registerUser = async (req, res) => {
  try {
    // Get data from request body
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      profilePicture: user.profilePicture,
      bio: user.bio,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Login User
const generateAccessToken = require("../utils/generateToken");

const loginUser = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare entered password with hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    // Wrong password
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token
    const token = generateAccessToken(user._id);

    // Return response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        profilePicture: user.profilePicture,
        bio: user.bio,
        isEmailVerified: user.isEmailVerified,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: req.user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Logged-in User Profile
const updateProfile = async (req, res) => {
  try {

    const { username, email, displayName, bio, profilePicture } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check username uniqueness
    if (username && username !== user.username) {

      const existingUsername = await User.findOne({ username });

      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      user.username = username;
    }

    // Check email uniqueness
    if (email && email !== user.email) {

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    if (displayName !== undefined)
      user.displayName = displayName;

    if (bio !== undefined)
      user.bio = bio;

    if (profilePicture !== undefined)
      user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        profilePicture: user.profilePicture,
        bio: user.bio,
        isEmailVerified: user.isEmailVerified,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Delete Logged-in User Account
// Delete Logged-in User Account
const deleteAccount = async (req, res) => {
  try {

    const userId = req.user._id;

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find all user's lists
    const lists = await List.find({ user: userId });

    const listIds = lists.map((list) => list._id);

    // Delete all list items inside those lists
    await ListItem.deleteMany({
      list: { $in: listIds },
    });

    // Delete all lists
    await List.deleteMany({
      user: userId,
    });

    // Delete ratings
    await Rating.deleteMany({
      user: userId,
    });

    // Delete reviews
    await Review.deleteMany({
      user: userId,
    });

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Account and all associated data deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
};