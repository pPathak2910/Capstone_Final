const router = require("express").Router();
let User = require("../models/user.model");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

router.route("/").get((req, res, next) => {
  //   User.find()
  //     .then(users => res.json(users))
  //     .catch(err => res.status(400).json('Error: ' + err));
  User.find()
    .then((users) => res.status(200).send(users))
    .catch(next);
});

router.route("/signup").post(async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const fullName = req.body.fullName ? req.body.fullName : "";
  const universityId = req.body.universityId ? req.body.universityId : "";
  const role = req.body.role;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12);
  const cgpa = req.body.cgpa ? req.body.cgpa : -1;
  const placed = req.body.placed ? req.body.placed : "faculty";
  // console.log("Here");
  // console.log(email, fullName, universityId, role, password);

  try {
    const user = await User.findOne({ email });
    if (user === null) {
      //   const token = jwt.sign(
      //     { email, fullName, universityId, role, password },
      //     process.env.ACCESS_TOKEN_SECRET,
      //     { expiresIn: "1h" }
      // );

      const newUser = new User({
        fullName,
        email,
        cgpa,
        placed,
        role,
        universityId,
        password: hashedPassword,
      });
      console.log(newUser);
      await newUser.save();
      return res.status(201).json({
        message: " User Created",
      });
    }
    return res
      .status(400)
      .json({ error: "An user with this email is already exist." });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.route("/signin").post(async (req, res, next) => {
  //   console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (user !== null) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(400)
          .send("No account found with the given credentials.");
      }
      const { fullName, universityId, role } = user;
      const token = jwt.sign(
        { email, fullName, universityId, role, password },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(201).json({
        message: " User Signed IN",
        user: user,
        token: token,
      });
    }
    return res
      .status(400)
      .send({ error: "No account found with the given credentials." });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.route("/:id").get((req, res, next) => {
  // User.findById(req.params.id)
  //   .then(user => res.json(user))
  //   .catch(err => res.status(400).json('Error: ' + err));
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(next);
});

router.route("/:id").delete((req, res, next) => {
  // User.findByIdAndDelete(req.params.id)
  //     .then(() => res.json('User deleted.'))
  //     .catch(err => res.status(400).json('Error: ' + err));
  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("User deleted."))
    .catch(next);
});

router.route("/update/:id").patch((req, res, next) => {
  // User.findById(req.params.id)
  //     .then(user => {
  //         user.username = req.body.username;

  //         user.save()
  //             .then(() => res.json('user updated!'))
  //             .catch(err => res.status(400).json('Error: ' + err));
  //         })
  //         .catch(err => res.status(400).json('Error: ' + err));

  console.log("update profile > ", req.body);

  User.findById(req.params.id)
    .then((user) => {
      user.fullName = req.body.fullName ? req.body.fullName : user.fullName;
      user.universityId = req.body.universityId
        ? req.body.universityId
        : user.universityId;
      user.mobileNo = req.body.mobileNo ? req.body.mobileNo : user.mobileNo;

      user
        .save()
        .then((updatedUser) => res.status(200).send(updatedUser))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
