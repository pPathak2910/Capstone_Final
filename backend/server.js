const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;
mongoose.connect(uri, {
  // @ts-ignore
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  family: 4,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connected to MongoDB successfully!");
});

const usersRouter = require("./routes/users");
const postRouter = require("./routes/post");
const jobRouter = require("./routes/job");
const discussionRouter = require("./routes/discussion");
// const quizzesRouter = require("./routes/quizzes");
// const quizResponsesRouter = require("./routes/quiz_responses");
// const assignmentsRouter = require("./routes/assignments");
// const assignmentResponsesRouter = require("./routes/assignment_responses");

app.use("/users", usersRouter);
app.use("/post", postRouter);
app.use("/job", jobRouter);
app.use("/discussion", discussionRouter);
// app.use("/quizzes", quizzesRouter);
// app.use("/quiz_responses", quizResponsesRouter);
// app.use("/assignments", assignmentsRouter);
// app.use("/assignment_responses", assignmentResponsesRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
