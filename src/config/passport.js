const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./secretKeyJwt');
const Auth = require('../services/auth');

module.exports = (passport) => {
    let ops = {};
    ops.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    ops.secretOrKey = Keys.secretKeyJwt;
    passport.use(new JwtStrategy(ops, async (jwt_payload, done) => {
        try {
            const user = await Auth.getUser(jwt_payload.data);
            if(user) return done(null, user);
            return done(null, false);
        } catch (error) {
            console.log(error);
            done(err, false);
        }
    }));
}