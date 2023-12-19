const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    email: {
      type: String,
    },
    status: {
      type: String,
      // can Take - open , closed
    },
    location: {
      type: String,
    },
    profile: {
      type: String,
    },
    content: {
      type: String,
    },
    ctc: {
      type: String,
    },
    company: {
      type: String,
    },
    type: {
      type: String,
      //can Take - intern , ppo , fte , both .
    },
    fileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
