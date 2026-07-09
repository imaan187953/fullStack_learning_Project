const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createList,
  getMyLists,
  getListById,
  updateList,
  deleteList,
} = require("../controllers/list.controller");

router.use(protect);

router.post("/", createList);

router.get("/", getMyLists);

router.get("/:id", getListById);

router.put("/:id", updateList);

router.delete("/:id", deleteList);

module.exports = router;