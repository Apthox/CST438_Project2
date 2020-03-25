var express = require('express');
var router = express.Router();

// default profile page
router.get('/', function(req, res, next) {
    if (req.session && req.session.username && req.session.username.length) {
        res.render('profile', {
            username: req.session.username
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/orders', function(req, res, next) {
    if (req.session && req.session.username && req.session.username.length) {
        res.render('orderHistory', {
            username: req.session.username
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;