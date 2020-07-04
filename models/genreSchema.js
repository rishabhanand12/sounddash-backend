var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var genreSchema = new Schema(
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
  },
  { timestamps: true }
);

var Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;
