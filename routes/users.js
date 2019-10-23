var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const myUser = {
    id: req.user.id,
    username: req.user.username,
    firstname: req.user.firstname,
    lastname: req.user.lastname
  }
  res.send(myUser);
});

module.exports = router;