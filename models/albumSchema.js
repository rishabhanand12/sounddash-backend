var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var albumSchema = new Schema(
  {
    albumName: {
      type: String,
    },
    tracks: {
      type: Schema.Types.ObjectId,
      ref: "Music",
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    favoritedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

var Album = mongoose.model("Album", albumSchema);
module.exports = Album;
