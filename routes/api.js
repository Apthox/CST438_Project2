var express = require('express');
var router = express.Router();

router.get('/getProducts', function(req, res, next) {
    res.end("damn");
});

module.exports = router;