var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Music",
      },
    ],
    playlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Music",
      },
    ],
  },
  { timestamps: true }
);

//METHOD TO HASH PASSWORD PRE SAVE FOR EACH USER DOCUMENT
userSchema.pre("save", async function (next) {
  try {
    if (this.password && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      // return next();
      next();
    }
    // next();
  } catch (error) {
    next(error);
  }
});

//METHOD TO COMPARE PASSWORD ENTERED WITH THE STORED PASSWORD FOR ANY USER INSTANCE
userSchema.methods.verifyPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    next(err);
  }
};

let User = mongoose.model("User", userSchema);
module.exports = User;
