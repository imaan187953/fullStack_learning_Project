const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  addItem,
  getItems,
  deleteItem,
} = require("../controllers/listItem.controller");

router.use(protect);

router.post("/:listId/items", addItem);

router.get("/:listId/items", getItems);

router.delete("/:listId/items/:itemId", deleteItem);

module.exports = router;