const mongoose = require("mongoose");

const listItemSchema = new mongoose.Schema(
  {
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },

    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      required: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate media in the same list
listItemSchema.index(
  {
    list: 1,
    media: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("ListItem", listItemSchema);