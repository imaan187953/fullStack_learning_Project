const List = require("../models/list.model");
const Media = require("../models/media.model");
const ListItem = require("../models/listItem.model");
const {
  getMovieDetails,
  getTVDetails,
} = require("../services/tmdb.service");

// Add Movie to List
const addItem = async (req, res) => {
  try {
    const { listId } = req.params;
    const {
      tmdbId,
      mediaType = "movie",
      notes,
    } = req.body;

    // Check list ownership
    const list = await List.findOne({
      _id: listId,
      owner: req.user._id,
    });

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    // Find media in cache
    let media = await Media.findOne({
      tmdbId,
      mediaType,
    });

    // Fetch from TMDB if not cached
    if (!media) {
      const movie = await getMovieDetails(tmdbId);

      media = await Media.create({
        tmdbId: movie.id,
        mediaType: "movie",
        title: movie.title,
        originalTitle: movie.original_title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        genres: movie.genres,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        popularity: movie.popularity,
        runtime: movie.runtime,
        status: movie.status,
        originalLanguage: movie.original_language,
      });
    }

    // Duplicate check
    const exists = await ListItem.findOne({
      list: list._id,
      media: media._id,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Movie already exists in this list",
      });
    }

    const item = await ListItem.create({
      list: list._id,
      media: media._id,
      addedBy: req.user._id,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      item,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Items of a List
const getItems = async (req, res) => {
  try {

    const list = await List.findOne({
      _id: req.params.listId,
      owner: req.user._id,
    });

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    const items = await ListItem.find({
      list: list._id,
    })
      .populate("media")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Item
const deleteItem = async (req, res) => {
  try {

    const list = await List.findOne({
      _id: req.params.listId,
      owner: req.user._id,
    });

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    const item = await ListItem.findOneAndDelete({
      _id: req.params.itemId,
      list: list._id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie removed successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addItem,
  getItems,
  deleteItem,
};