const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	path = require('path'),
	users = require('../data/');

const loginRoutes = require("./login");
const signupRoutes = require("./signup");

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


let configureRoutes = (app) => {

	app.use(passport.initialize());
	app.use(passport.session());

	app.use('/login',loginRoutes);

	app.use('/signup',signupRoutes);
	app.get('/private', (req, res) => {

		if (req.isAuthenticated()) {
			let username = req.user.split(' ')[0];
			let userInfo = users.getUserById(username);
			res.render('private.handlebars', {
				username: username,
				alias: userInfo.alias,
				firstName: userInfo.firstName,
				lastName: userInfo.lastName,
				profession: userInfo.profession,
				bio: userInfo.bio
			});
		} else {
			res.redirect(301, '/login');
		}

	})

	app.get('/', (req, res) => {
		// protect endpoints
		if (req.isAuthenticated()) {
			res.redirect(301, '/private/');
		} else {
			res.redirect(301, '/login/')
		}
	})
}

module.exports = configureRoutes
