var express = require('express');
var router = express.Router();
var productController = require('../controllers/products');

router.get('/getProducts', function(req, res, next) {

    res.json(productController.getAllProducts());
});

module.exports = router;