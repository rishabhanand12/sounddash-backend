var express = require('express');
var uploadcontroller = require('../controllers/uploadController');
var checkAuth = require('../middlewares/checkAuth');
var router = express.Router();


router.use(checkAuth.isLoggedIn);

router.post("/",uploadcontroller.fileUploads,uploadcontroller.handleUpload);

module.exports = router;

