var multer = require("multer");
var multerS3 = require("multer-s3");
var aws = require("aws-sdk");
var Music = require("../models/musicSchema");
var Artist = require("../models/artistSchema");
var Genre = require("../models/genreSchema");
var User = require("../models/userschema");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

var s3 = new aws.S3({
  /* ... */
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sounddash",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (_req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

exports.fileUploads = upload.fields([
  {
    name: "albumArt",
  },
  {
    name: "track",
  },
]);

exports.handleUpload = async (req, res, next) => {
  try {
    let { loggedInUser } = res.locals;
    req.body.artist = req.body.artist.split(",");
    req.body.coverLocation = req.files.albumArt[0].location;
    req.body.trackLocation = req.files.track[0].location;
    req.body.uploadedBy = loggedInUser.id;
    let newTrack = await Music.create(req.body);
    let newGenre = await Genre.findOneAndUpdate(
      { name: newTrack.genre },
      { $push: { tracks: newTrack.id }},
      { upsert: true } 
    );
    newTrack.artist.forEach(async artist => {
      await Artist.findOneAndUpdate({name:artist},{$push: {tracks:newTrack.id}},{upsert:true});
    });
    let updatedUser = await User.findOneAndUpdate({_id:loggedInUser.id},{$push:{tracks:newTrack.id}});
    res.json({ newTrack });
  } catch (err) {
    next(err);
  }
};
