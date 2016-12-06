const express = require('express'),
	app = express(),
	session = require('express-session'),
	flash = require('connect-flash'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	exphbs = require('express-handlebars'),
	configureRoutes = require('./routes'),
	Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
	defaultLayout: 'main',
	// Specify helpers which are only registered on this instance.
	helpers: {
		asJSON: (obj, spacing) => {
			if (typeof spacing === "number")
				return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

			return new Handlebars.SafeString(JSON.stringify(obj));
		}
	},
	partialsDir: [
		'views/partials/'
	]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
	// If the user posts to the server with a property called _method, rewrite the request's method
	// To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
	// rewritten in this middleware to a PUT route
	if (req.body && req.body._method) {
		req.method = req.body._method;
		delete req.body._method;
	}

	// let the next middleware run:
	next();
};

//-------------------------- set up express for password --------------------------
// Most middleware (like cookieParser) is no longer bundled with Express and must be installed separately
// Expresss session must be provide before passport session
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	//http://stackoverflow.com/questions/11277779/passportjs-deserializeuser-never-called
	cookie: {
		secure: false // true for https
	}
}))

app.use(flash()); // passport need this method to use flush (express doesn't have this method for build int after 3.x)
app.use(cookieParser()); // password need to user cookie to maintain a session

//-------------------------- static page --------------------------
app.use('/public', express.static(__dirname + '/public'));

//-------------------------- body parser --------------------------
// parse application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

//-------------------------- setup for handle bars --------------------------
app.use(rewriteUnsupportedBrowserMethods);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configureRoutes(app);

app.listen(3000, 'localhost', () => {
	console.log('server running on http://localhost:3000');
});
