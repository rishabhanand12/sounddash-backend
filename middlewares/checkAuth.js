var User = require("../models/userschema");
var jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
  let authToken = req.headers.authorization || "";
  if (!authToken) {
    res.sendStatus(500);
    res.json({
      error: "Unauthorized",
    });
  } else {
    try {
      var payload = await jwt.verify(
        authToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      var user = await User.findOne({ id: payload.user });
      res.locals.loggedInUser = user;
      next();
    } catch (err) {
      next(err);
    }
  }
};
