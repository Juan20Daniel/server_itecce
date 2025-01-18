const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./secretKeyJwt');
const Users = require('../services/users');

module.exports = (passport) => {
    let ops = {};
    ops.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    ops.secretOrKey = Keys.secretKeyJwt;
    passport.use(new JwtStrategy(ops, async (jwt_payload, done) => {
        try {
            const { username } = jwt_payload.data;
            const user = await Users.getUser(username);
            if(user) return done(null, user);
            return done(null, false);
        } catch (error) {
            console.log(error);
            done(error, false);
        }
    }));
}