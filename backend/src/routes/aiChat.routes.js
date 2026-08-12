const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  chatWithAI,
} = require("../controllers/aiChat.controller");

router.use(protect);

/**
 * AI Chat
 */
router.post("/", chatWithAI);

module.exports = router;