const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
    },
    cgpa: {
      type: Number,
    },
    placed: {
      type: String,
      // can take - unplaced , intern , fte_only , both , faculty.
    },
    role: {
      type: String,
      //can take - student ,teacher ,alumni .
    },
    universityId: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
