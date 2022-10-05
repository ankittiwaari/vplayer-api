const express = require('express');
const router = express.Router();
const FB = require('../controller/file-browser');
const fileBrowser = new FB();
router.get('/list/:path?', fileBrowser.listFiles);
module.exports = router;