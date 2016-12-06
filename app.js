const app = require("express")();

const static = express.static(__dirname + '/public');

const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
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

const configRoutes = require("./routes");

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


// ---------- for debug only ----------
app.use(function(req, res, next) {
        console.log('req.method and url  is ' + req.method + " " + req.url);
        console.log("req--------------------:")
        console.log(req)
        console.log('');
        next();
    })



app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false // true for https
    }
}));

app.use(require('connect-flash')());
app.use(require('cookie-parser')());


app.use("/public", static);

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({
    extended: true
}));

app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');




configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});