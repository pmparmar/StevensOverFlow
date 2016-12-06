const express = require('express');
const router = express.Router();
const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	path = require('path'),
	users = require('../data/');

let configurePassport = (passport) => {

	// local strategy to verify username ans password
	passport.use(new LocalStrategy(
		(username, password, done) => {

			let res = users.verifyUserPass(username, password);

			if (res.status)
				return done(null, res.message);

			return done(null, false, {
				message: res.message
			});
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {

		let auth = user.split(' ');
		if (auth.length != 2)
			return done(null, false, {
				message: "Cookie is not valid"
			});

		let username = auth[0];
		let password = auth[1];

		let res = users.verifyUserPass(username, password);

		if (res.status)
			return done(null, res.message);

		return done(null, false, {
			message: res.message
		});
	});
}



configurePassport(passport);
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {

	if (!req.isAuthenticated()) {
		if (req.session.flash && req.session.flash.error) {
			res.render('login.handlebars', {
				error: true,
				message: req.session.flash.error.slice(-1)[0]
			});
			return
			}
			res.render('login.handlebars', {
				error: false
			});
		} else {
			res.redirect(301, '/private/');
	}
});

router.post('/', passport.authenticate('local', {
		successRedirect: '/private',
		failureRedirect: '/login',
		failureFlash: true,
		successFlash: 'Welcome!'
}));

    module.exports = router;