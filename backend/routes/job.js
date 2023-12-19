const router = require("express").Router();
const { Router } = require("express");
let Job = require("../models/job.model");
const lodash = require("lodash");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "../uploads/",
  filename: function (_req, file, cb) {
    console.log(file);
    cb(null, "JOB_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

router.route("/").post((req, res) => {
  const path = "../uploads/" + req.body.fileUrl;
  res.download(path);
});

router.route("/").get(async (req, res, next) => {
  try {
    const jobs = await Job.find();
    return res.status(200).send(jobs);
  } catch (err) {
    return res.status(err.status).send(err.message);
  }
});

router.route("/findById").post(async (req, res, next) => {
  const jobId = req.body._id;
  try {
    const job = await Job.findById(jobId);
    return res.status(400).send(job);
  } catch (err) {
    return res.status(err.status).send(err.message);
  }
});

router.route("/create").post(upload.single("file"), async (req, res, next) => {
  let fileUrl = req.body.fileUrl;
  const { email, location, profile, ctc, company, type, content } = req.body;
  const status = "open";
  const newJob = new Job({
    fileUrl: "JOB_" + fileUrl,
    email,
    location,
    profile,
    ctc,
    company,
    type,
    status,
    content,
  });
  try {
    await newJob.save();
    return res.status(200).send("Job Created");
  } catch (err) {
    return res.status(err.status).send(err.message);
  }
});

router.route("/close").post(async (req, res) => {
  // console.log(req.body);
  try {
    const jobId = req.body._id;
    let job = await Job.findOne({ _id: jobId });
    // compact.log(job);
    await Job.updateOne({ _id: jobId }, { status: "closed" });
    return res.status(200).send("Job Closed");
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
