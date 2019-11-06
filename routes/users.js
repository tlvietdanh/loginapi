var express = require('express');
var router = express.Router();
const userModal = require('../modal/users');
const jwt = require('jsonwebtoken');
const passport = require("passport");
require('../passport');


/* GET users listing. */
router.get('/', function (req, res, next) {
  const myUser = {
    id: req.user.id,
    username: req.user.username,
    fullname: req.user.fullname,
    email: req.user.email,
    avatar: req.user.avatar
  }
  res.send(myUser);
});

router.post('/edit', function (req, res, next) {
    // If exits password in body
    console.log(req.body)
    if (req.body.oldPass) {
        userModal.findOne({
            where: {
                id: req.user.id
            }
        }).then(checkUser => {
            if (req.body.oldPass === checkUser.password) {
                const temp = req.body.newPass;
                delete req.body.oldPass;
                delete req.body.newPass;
                req.body.password = temp;
                userModal.update(req.body, {
                    where: {
                        id: req.user.id
                    },
                    returning: true,
                    plain: true
                }).then(data1 => {
                    userModal.findOne({
                        where: {
                            id: req.user.id
                        }
                    }).then(data => {
                        const myUser = {
                            id: data.id,
                            username: data.username,
                            fullname: data.fullname,
                            email: data.email,
                            avatar: data.avatar
                        }
                        res.send(myUser);
                    }).catch(err => {
                        res.send(err)
                    })
                })
                .catch(err => {
                    res.send("Edit Data Failed");
                })
            }
            else {
                res.send("Wrong password");
            }
        }).catch(err => {
            res.send('Edit data faild');
        })
    }
    // if not exists password in body
    else {
        userModal.update(req.body, {
            where: {
                id: req.user.id
            },
            returning: true,
            plain: true
        }).then(data1 => {
            userModal.findOne({
                where: {
                    id: req.user.id
                }
            }).then(data => {
                const myUser = {
                    id: data.id,
                    username: data.username,
                    fullname: data.fullname,
                    email: data.email,
                    avatar: data.avatar
                }
                res.send(myUser);
            }).catch(err => {
                res.send(err)
            })
        })
        .catch(err => {
            res.send("Edit Data Failed");
        })
    }
});

module.exports = router;
