require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var indexRoute = require("./routes/index");
var uploadRoute = require("./routes/upload");
var trackRoute = require('./routes/track');
var cors = require("cors");
//INSTANTIATING EXPRESS SERVER
var app = express();

//CONNECTING TO MONGODB SERVER
mongoose.connect(
  "mongodb://localhost/sounddash",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    console.log("connected", err ? err : true);
  }
);

//PARSER MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//ROUTING MIDDLEWARE
app.use("/", indexRoute);
app.use("/upload", uploadRoute);
app.use("/api/track",trackRoute);

//ERROR PARSER MIDDLEWARES
app.use((_req, res, next) => {
  res.send("Page not found");
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // Send the error
  // console.log(err);
  res.status(200);
  res.send({
    errors: {
      body: [err.message],
    },
  });
});

//LISTENING TO SERVER ON PORT
var PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
