const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postRegister = async (req, res) => {
  //checking if the user is already validate or not
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }
  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  user = await user.save();
  if (!user) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send({ user: user._id });
};

//login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  //checking if the user is exits or not
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(400).json({ error: "Email1 or password is wrong" });
  }
  //if password is correct or not
  const validPass = await bcrypt.compare(password, userExist.password);
  if (!validPass) {
    return res.status(400).json({ error: "Email or password1 is wrong" });
  }
  //create and assign token
  const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token });
  // res.send("Logged In");
};
