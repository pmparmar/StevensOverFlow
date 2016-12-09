//expecting from database
const Data = require('../data');

//expecting from login
const configPassport = require('./passportconfig');

const passport = require('passport');
configPassport(passport);


const constructorMethod = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    //http://stackoverflow.com/questions/26859349/can-you-authenticate-with-passport-without-redirecting

    // app.post('/login',
    //     passport.authenticate('local'),
    //     function(req, res) {
    //         // If this function gets called, authentication was successful.
    //         // `req.user` contains the authenticated user.
    //         res.json({"status":"success","user":req.user});
    //     });

    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        })
    );



    app.post('/signup', (req, res) => {
        Data.Signup(req.body.email, req.body.password).then(info => {
            console.log(info); //e.g.  sign up successed, usrname: pasword:

            /* refer from
            http://code.runnable.com/VKHrGJKvwo55gHL7/express-passport-js-login-and-register-for-node-js-and-hello-world            
            */
            passport.authenticate('local')(req, res, function() {
                res.redirect('/profile');
            });

        }).catch(err => {
            res.render('partials/sigup', {
                email: req.body.email,
                message: err
            });
        });

    });

    app.get('/login', (req, res) => {
            res.redirect('/');
       
    });

    app.get('/logout',
        function(req, res) {
            req.logout();
            res.redirect('/');
        });



    app.get('/signup', (req, res) => {
        render('partials/login', {
            // message expecting from login
            message: req.flash('signupmessage')
        });

    });

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            res.render('partials/profile_working', {
                user: req.user
           //     partial:"profile-script"
            })
        });

    app.get('/', (req, res) => {

        // expecting from database
        // get user setting and prefer 
        // in order to display the homepage postlist
        // it will always work even user is undefined
        Data.DefaultSearch(req.user).then(postlist => {
            res.render('partials/home', {
                list: postlist,
                user: req.user,
                loginmessage:loginmessage
            });
        }).catch(err => {
            res.render('partials/home', {
                user: req.user,
                listerrormessage: err
            })
        });
    });
    
    // when search cliked with a 'post' dropdown tag
    app.get('/searchpost', (req, res) => {
        //excepting searching ULR like :
        // :3000/search?q=java
        // then i got java
        Data.post.Search(req.query.q).then(postlist => {
            res.render('partials/home', {
                list: postlist,
                user: req.user
            })
        }).catch(err => {
            res.render('partials/home', {
                user: req.user,
                listerrormessage: err
            })
        });
    });
    
    // when search cliked with a 'user' dropdown tag
    // search user ???  not sure
    app.get('/searchuser', (req, res) => {
        //excepting searching ULR like :
        // :3000/search?q=java
        // then i got java
        Data.user.Search(req.query.q).then(userlist => {
            res.render('partials/userlist', {
                list: userlist,
                user: req.user //logged in user
            })
        }).catch(err => {
            res.render('partials/home', {
                user: req.user,
                listerrormessage: err
            })
        });
    });

    //the single post page
    app.get('/post/:id', (req, res) => {
        Data.findpostbyid(req.param.id).then(post => {
            res.render('partials/singlepost', {
                post: post
            });
        }).catch(err => {
            res.render('partials/singlepost', {
                message: err
            });
        });
    });

    //form page for creating a new post(quesiton)
    app.get('/posting', (req, res) => {
        res.render('partials/postform')
    });

    //post method to create a new post(quesiton)
    app.post('/posting', (req, res) => {
        if (!req.isAuthenticated()) {
            res.render('partials/postform', {
                loginerrormessage: 'Please login'
            });
        } else {
            Data.posts.create(req.user, req.body).then(newpost => {
                res.redirect('/post/{{newpost._id}}');
            }).catch(err => {
                res.render('partials/postform', {
                    message: err
                });
            });
        }
    });

    //post method to create a new anster, 
    //no single page for answer, the form is on the bottom 
    app.post('/answering', (req, res) => {

        if (!req.isAuthenticated()) {
            res.render('partials/postform', {
                loginerrormessage: 'Please login'
            });
        } else {
            
            // the postid that this comment belongs to is included in the req.body
            Data.answers.create(req.user, req.body).then(locationhash => {

                // answer successed, go to the new answer location of the same post page
                res.redirect('/post/' + req.body.postid + '#' + locationhash);
            }).catch(err => {

                // answer falied, stay on the post page
                res.redirect('/post/' + req.body.postid);

            });
        }
    });

    //post method to create a new comment, 
    //no single page for comment, the form is inside the postpage 
    app.post('/commenting', (req, res) => {

        if (!req.isAuthenticated()) {

            res.render('partials/postform', {
                loginerrormessage: 'Please login'
            });
        } else {
            
            // the answer that this comment belongs to is included in the req.body
            // the post id that the answer belongs to is included in the req.body too
            Data.cmoments.create(req.user, req.body).then(locationhash => {

                // comment successed, go to the new comment location of the same post page
                res.redirect('/post/' + req.body.postid + '#' + locationhash);
            }).catch(err => {

                // comment falied, stay on the post page
                res.redirect('/post/' + req.body.postid);

            });
        }
    });


    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
