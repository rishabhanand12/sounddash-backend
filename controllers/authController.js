const User = require("../models/userschema");
const jwt = require("jsonwebtoken");

//RESGISTER A NEW USER
exports.registerUser = async (req, res, next) => {
  try {
    let { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res.json({ error: `${email} is taken` });
    } else {
      let user = await User.create(req.body);
      let token = await jwt.sign(
        { user: user.id },
        process.env.ACCESS_TOKEN_SECRET
      );
      user._doc.authToken = token;
      res.json({ user });
    }
  } catch (err) {
    next(err);
  }
};

//LOGIN A USER
exports.loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      res.json({ error: "Invalid Email" });
    } else if (!(await user.verifyPassword(password))) {
      res.status(500);
      res.json({ error: "Incorrect Password" });
    } else {
      let token = await jwt.sign(
        { user: user.id },
        process.env.ACCESS_TOKEN_SECRET
      );
      user._doc.authToken = token;
      res.json({ user });
    }
  } catch (err) {
    next(err);
  }
};
