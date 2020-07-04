let express = require("express");
let trackController = require("../controllers/trackController");
let router = express.Router();

router.post("/",trackController.getAllTracks);

module.exports = router;
