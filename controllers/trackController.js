let Track = require("../models/musicSchema");

exports.getAllTracks = async (req, res, next) => {
  try {
    let allTracks = await Track.find({});
    res.json({ allTracks });
  } catch (err) {
    next(err);
  }
};
