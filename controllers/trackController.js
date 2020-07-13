let Track = require("../models/musicSchema");

exports.getAllTracks = async (_req, res, next) => {
  try {
    let allTracks = await Track.find({});
    res.json({ allTracks });
  } catch (err) {
    next(err);
  }
};

exports.getTrackByUser = async (req,res,next) => {
  
}
