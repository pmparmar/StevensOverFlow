const UserData = require('../data');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


constructorMethod = (passport) => {

    passport.use(new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
            UserData.findOne(username, password).then(res => {
                    console.log('findOne found :');
                    console.log(res);
                    return done(null, res);
                })
                .catch(err => {
                    console.log('findOne cannt find: ' + err);
                    return done(null, false, req.flash('loginmessage', err));
                });
        }
    ));


    passport.serializeUser(function(user, cb) {
        cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {
        UserData.findById(id).then(res => {
            cb(null, res);
        }).catch(err => {
            cb(err, null);
        });
    });

}


module.exports = constructorMethod;