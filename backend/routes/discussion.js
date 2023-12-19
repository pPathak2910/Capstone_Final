const router = require("express").Router();
let Discussion = require("../models/discussion.model");
let jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
  const { email, heading, content } = req.body;
  const comments = [];
  try {
    const newDiscussion = new Discussion({
      email,
      heading,
      content,
      comments,
    });
    await newDiscussion.save();
    return res.status(201).json({
      message: "Discussion Created Successfully",
    });
  } catch (err) {
    return res.status(err.status).send({ error: err.message });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const discussion = await Discussion.find();
    return res.status(200).send(discussion);
  } catch (err) {
    return res.status(err.status).send(err.message);
  }
});

router.route("/comment").post(async (req, res) => {
  console.log(req.body);
  try {
    const newComment = req.body.comment;
    const discussId = req.body._id;
    let doc = await Discussion.findOne({ _id: discussId });

    await Discussion.updateOne(
      { _id: discussId },
      { comments: [...doc.comments, newComment] }
    );
    return res.status(200).send("Comment Added");
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.route("/").patch(async (req, res) => {});
module.exports = router;
