const express = require("express");

const router = express.Router();

const {
  search,
  getMovie,
  trending,
} = require("../controllers/media.controller");

router.get("/search", search);

router.get("/movie/:id", getMovie);

router.get("/trending", trending);

module.exports = router;