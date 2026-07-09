const Rating = require("../models/rating.model");
const Media = require("../models/media.model");

// Create Rating
const createRating = async (req, res) => {
    try {

        const { mediaId, rating } = req.body;

        // Check media exists
        const media = await Media.findById(mediaId);

        if (!media) {
            return res.status(404).json({
                success: false,
                message: "Media not found"
            });
        }

        // Check if user already rated
        const existingRating = await Rating.findOne({
            user: req.user._id,
            media: mediaId
        });

        if (existingRating) {
            return res.status(400).json({
                success: false,
                message: "You have already rated this movie"
            });
        }

        const newRating = await Rating.create({
            user: req.user._id,
            media: mediaId,
            rating
        });

        res.status(201).json({
            success: true,
            message: "Rating added successfully",
            rating: newRating
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get My Rating
const getMyRating = async (req, res) => {

    try {

        const rating = await Rating.findOne({
            user: req.user._id,
            media: req.params.mediaId
        }).populate("media");

        if (!rating) {
            return res.status(404).json({
                success: false,
                message: "Rating not found"
            });
        }

        res.status(200).json({
            success: true,
            rating
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Rating
const updateRating = async (req, res) => {

    try {

        const rating = await Rating.findOneAndUpdate(
            {
                user: req.user._id,
                media: req.params.mediaId
            },
            {
                rating: req.body.rating
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!rating) {
            return res.status(404).json({
                success: false,
                message: "Rating not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Rating updated successfully",
            rating
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Rating
const deleteRating = async (req, res) => {

    try {

        const rating = await Rating.findOneAndDelete({
            user: req.user._id,
            media: req.params.mediaId
        });

        if (!rating) {
            return res.status(404).json({
                success: false,
                message: "Rating not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Rating deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Average Rating
const getAverageRating = async (req, res) => {

    try {

        const result = await Rating.aggregate([
            {
                $match: {
                    media: mediaId = require("mongoose").Types.ObjectId.createFromHexString(req.params.mediaId)
                }
            },
            {
                $group: {
                    _id: "$media",
                    averageRating: {
                        $avg: "$rating"
                    },
                    totalRatings: {
                        $sum: 1
                    }
                }
            }
        ]);

        if (result.length === 0) {

            return res.status(200).json({
                success: true,
                averageRating: 0,
                totalRatings: 0
            });

        }

        res.status(200).json({
            success: true,
            averageRating: Number(result[0].averageRating.toFixed(1)),
            totalRatings: result[0].totalRatings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createRating,
    getMyRating,
    updateRating,
    deleteRating,
    getAverageRating
};