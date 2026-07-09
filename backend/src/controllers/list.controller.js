const List = require("../models/list.model");

// Create List
const createList = async (req, res) => {
  try {
    const { name, description, visibility } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "List name is required",
      });
    }

    const list = await List.create({
      name,
      description,
      visibility,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "List created successfully",
      list,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Logged-in User Lists
const getMyLists = async (req, res) => {
  try {

    const lists = await List.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: lists.length,
      lists,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single List
const getListById = async (req, res) => {
  try {

    const list = await List.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    res.status(200).json({
      success: true,
      list,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update List
const updateList = async (req, res) => {
  try {

    const list = await List.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "List updated successfully",
      list,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete List
const deleteList = async (req, res) => {
  try {

    const list = await List.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "List deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createList,
  getMyLists,
  getListById,
  updateList,
  deleteList,
};