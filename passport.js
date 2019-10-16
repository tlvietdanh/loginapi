const passport = require('passport');
const passportJWT = require("passport-jwt");
const UserModel = require('./modal/users');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
        username: 'username',
        password: 'password'
    },
    function (username, password, cb) {
        console.log(username)
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return UserModel.findOne({
                where: {
                    username: username,
                    password: password
                }
            })
            .then(user => {
                console.log("user")

                console.log(user)
                if (!user) {
                    return cb(true, null, {
                        message: 'Incorrect username or password.'
                    });
                }
                return cb(false, user.dataValues, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'homnaylamotngaydeptroivatoiphaingoilamdealine'
    },
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));