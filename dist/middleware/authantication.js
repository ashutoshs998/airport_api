'use strict';

var db = require('../db.js');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../middleware/config');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
    console.log('payload received', jwt_payload);
    db.register_user.find({ _id: jwt_payload.id }).exec(function (err, user) {
        console.log(user);
        if (err) {
            return callback(err, null);
        } else if (!user) {
            return callback(null, false);
        } else {
            return callback(null, user);
        }
    });
}));
//# sourceMappingURL=authantication.js.map