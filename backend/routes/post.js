const router = require("express").Router();
let Post = require("../models/post.model");
let jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
  const { email, heading, content, type } = req.body;
  try {
    const newPost = new Post({
      email,
      heading,
      content,
      type,
    });
    await newPost.save();
    return res.status(201).json({
      message: "Post Created Successfully",
    });
  } catch (err) {
    return res.status(err.status).send({ error: err.message });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).send(posts);
  } catch (err) {
    return res.status(err.status).send(err.message);
  }
});

router.route("/").delete(async (req, res) => {
  console.log(req.body);
  try {
    const id = req.body.id;
    await Post.deleteOne({ _id: id });
    return res.status(200).send("Post Deleted");
  } catch (err) {
    return res.status(err.status).send(err.message);
  }
});

module.exports = router;
