const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./secretKeyJwt');
const Auth = require('../services/auth');

module.exports = (passport) => {
    let ops = {};
    ops.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    ops.secretOrKey = Keys.secretKeyJwt;
    passport.use(new JwtStrategy(ops, (jwt_payload, done) => {
        Auth.getUser(jwt_payload.data, (err, user) => {
            if(err) return done(err, false);
            if(user) return done(null, user);
            return done(null, false);
        });
    }));
}