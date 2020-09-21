const passport = require("passport")
const ExtraJwt = require("passport-jwt").ExtractJwt
const jwtStrategy = require("passport-jwt").Strategy
const Usuario = require("../models/usuario")

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: ExtraJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "lomismoquetodaslasnochespinky"
}, (payload, done) => {
    Usuario.findById(payload._doc._id)
        .then(Usuario => {
            if (!Usuario) {
                return done(null, false)
            } else {
                return done(null, Usuario)

            }
        })
        .catch(error => {
            return done(error, false)
        })
}))
