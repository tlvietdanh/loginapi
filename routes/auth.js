const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const userModal = require('../modal/users');
require('../passport');


router.post('/register', function (req, res, next) {
    userModal.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400)
            res.send(err);
        })
});

/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'homnaylamotngaydeptroivatoiphaingoilamdealine');
            return res.json({
                user,
                token
            });
        });
    })(req, res, next);
});

module.exports = router;