const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
    createRating,
    getMyRating,
    getMyRatings,
    updateRating,
    deleteRating,
    getAverageRating
} = require("../controllers/rating.controller");

router.use(protect);

router.post("/", createRating);

router.get("/my", getMyRatings);

router.get("/:mediaId", getMyRating);

router.patch("/:mediaId", updateRating);

router.delete("/:mediaId", deleteRating);

router.get("/:mediaId/average", getAverageRating);

module.exports = router;