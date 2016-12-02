const UserData = require('../data');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
s

passport.use(new LocalStrategy(
  function(username, password, done) {
    UserData.findOne(username,password).then(res => {
    	return done(null, user);
    }).catch(err => {
    	return done(null, false, { message: err });
    });
  }
));

const constructorMethod = (app) => {
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        });
    );

    app.get('/login' (req, res) => {
    	res.render('partials/loginform',{});
    });

    app.get('/private' (req, res) => {
    	res.render('partials/private',{user:req.user});
    });
    app.get('/' (req, res) => {
    	UserData.hashedPassword1();
    	UserData.hashedPassword2();
    	UserData.hashedPassword3();
    	if(req.user)
    		res.redirect('/private'+req.user);
    	res.render()


    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
