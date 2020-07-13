var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var artistSchema = new Schema(
  {
    name: {
      type: String,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Music",
      },
    ],
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
  },
  { timestamps: true }
);

var Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
