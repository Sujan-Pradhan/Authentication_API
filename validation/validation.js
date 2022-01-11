const userValidation = (req, res, next) => {
  req.check("name", "Name must be required").notEmpty();
  req
    .check("email", "Email is required")
    .notEmpty()
    .isEmail()
    .isLength({
      min: 12,
    })
    .withMessage("Must be in valid format and must be 12 characters ");
  req
    .check("password", "Password required")
    .notEmpty()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("Password most be between 6-20 characters");
  // .isIn(["123456", "password", "god"])
  // .withMessage("Do not use common word as the password");
  // .matches(
  //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  // ).withMessage(
  //   "Password must be 6-16 characters with atleast one digit and a special characters"
  // );
  const errors = req.validationErrors();
  if (errors) {
    const showErrors = errors.map((err) => err.msg);
    return res.status(400).json({ error: showErrors });
  }

  next(); //to send to next function
};

const loginValidation = (req, res, next) => {
  req
    .check("email", "Email is required")
    .notEmpty()
    .isEmail()
    .isLength({
      min: 12,
    })
    .withMessage("Must be in valid format and must be 12 characters ");
  req
    .check("password", "Password required")
    .notEmpty()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("Password most be between 6-20 characters");
  const errors = req.validationErrors();
  if (errors) {
    const showErrors = errors.map((err) => err.msg);
    return res.status(400).json({ error: showErrors });
  }

  next();
};

module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;
