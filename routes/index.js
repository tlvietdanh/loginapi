var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('welcome to web-API created by 1612083');
});

module.exports = router
