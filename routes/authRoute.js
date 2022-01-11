const express = require("express");
const verify = require("./verifyToken");
const { postRegister, userLogin } = require("../controller/authController");
const { userValidation, loginValidation } = require("../validation/validation");
const router = express.Router();

router.post("/register", userValidation, postRegister);
router.post("/login", loginValidation, userLogin);

router.get("/post", verify, (req, res) => {
  //   res.send(req.user);
  //   User.findByOne({ _id: req.user });
  //   res.json({
  //     posts: {
  //       title: "My first post",
  //       description: "Random data you shouldn't access",
  //     },
  //   });
});

module.exports = router;
