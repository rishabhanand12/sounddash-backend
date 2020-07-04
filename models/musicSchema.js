var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var musicSchema = new Schema(
  {
    trackName: {
      type: String,
    },
    artist: [
      {
        type: String,
      },
    ],
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    coverLocation: {
      type: String,
    },
    trackLocation: {
      type: String,
    },
    genre: {
      type: "String",
    },
  },
  { timestamps: true }
);

var Music = mongoose.model("Music", musicSchema);
module.exports = Music;
