const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
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
    type: {
      type: String,
      //can Take - announcement , shortlist , interview_list , event .   
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
