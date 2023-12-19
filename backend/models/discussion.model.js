const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discussionSchema = new Schema(
  {
    email: {
      type: String,
    },
    heading: {
      type: String,
    },
    content: {
      type: String,
    },
    comments: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;
