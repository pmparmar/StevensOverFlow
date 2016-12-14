const UserData = require('../data');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


constructorMethod = (passport) => {

    passport.use(new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password'
        },
        function(req, email, password, done) {
            UserData.database.getUserByEmail(email).then(user => {

                    if (user.password === password)
                        return done(null, user);
                    else {
                        console.log('found user by this email, but wrong password');
                        return done(null, false, req.flash('loginmessage', "Wrong password"));
                    }
                })
                .catch(err => {
                    console.log('in passport config, cannt find this email, err:');
                    console.log(err);
                    return done(null, false, req.flash('loginmessage', err));
                });
        }
    ));


    passport.serializeUser(function(user, cb) {
        cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {
        UserData.database.getUserById(id).then(res => {
            cb(null, res);
        }).catch(err => {
            cb(err, null);
        });
    });

}


module.exports = constructorMethod;