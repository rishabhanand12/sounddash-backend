let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let playlistSchema = new Schema(
  {
    name: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: "Music"
    }]
  },
  { timestamps: true }
);

let Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
