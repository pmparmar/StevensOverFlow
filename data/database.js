var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/alpha');


//
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
    },
    password: String,
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    icon: {
        type: String,
        lowercase: true,
    },
    points: {
        type: Number,
        default: 0
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});
var User = mongoose.model('User', UserSchema);

var AnswerSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    body: String,
    title: String,

    attachments: String,
    isAccepted: Boolean,
    vote: {
        type: Number,
        default: 0
    },
    createDate: Date,
    updateDate: Date,

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});
var Answer = mongoose.model('Answer', AnswerSchema);

var PostSchema = new mongoose.Schema({


    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    body: String,

    attachments: String,
    vote: {
        type: Number,
        default: 0
    },
    createDate: Date,
    updateDate: Date,
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }]
});
var Post = mongoose.model('Post', PostSchema);

var CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    },
    commentBody: String,
    createDate: Date,
    updateDate: Date
});
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
    getUsers: function(callback) {
        return new Promise((resolve, reject) => {
            User.find(function(err, users) {
                if (err) {
                    return err;
                }
                resolve(users)
            })
        })
    },


    createUser: function(userObject, callback) {
        console.log('createUser called');

        return new Promise((resolve, reject) => {

            var user = new User(userObject);
            user.save(function(err, user) {
                if (err) {
                    reject(err);
                }
                resolve(user);
            });

        })
    },
    deleteUser: function(id, callback) {
        return new Promise((resolve, reject) => {
            User.findById(id, function(err, user) {
                if (err) {
                    reject(err)
                }
                user.remove();
                resolve("Removed")
            })
        })
    },
    updateUser: function(id, field, value, callback) {
        return new Promise((resolve, reject) => {

            a = {};
            a[field] = value;
            User.update({
                _id: id
            }, {
                $set: a
            }, function(err, us) {
                if (err) {
                    reject(err)
                }
                resolve(us)
            });
        })

    },
    getUserById: function(id, callback) {
        return new Promise((resolve, reject) => {
            User.findById(id, function(err, us) {
                if (err) {
                    reject(err)
                }
                resolve(us)
            })
        })
    },


    // going to fix
    getUserByEmail: function(email, callback) {
        return new Promise((resolve, reject) => {
            this.getUsers().then(usr => {
                let user_found = usr.filter(x => x.email === email).shift();
                if (!user_found)
                    reject("Not user found by this email");
                else {
                    resolve(user_found);
                }

            })
        })
    },


    getPosts: function(callback) {

        return new Promise((resolve, reject) => {


            Post.find(function(err, posts) {
                if (err) {
                    reject(err);
                }
                resolve(posts);
            });
        })
    },
    createPost: function(postObject, userId, callback) {
        console.log('createPost called');
        return new Promise((resolve, reject) => {


            var post = new Post(postObject);
            this.getUserById(userId)
                .then((us) => {
                    post.userId = us;
                    post.save(function(err, post) {
                        if (err) {
                            reject(err);
                        }
                        us.posts.push(post);
                        us.save();
                        resolve(post);
                    });
                })
                .catch(err => {
                    reject(err);
                })

            // this.getUserById(userId, function(us) {

            // });
        })
    },
    deletePost: function(id, callback) {
        return new Promise((resolve, reject) => {

            Post.findById(id, function(err, post) {
                if (err) {
                    reject(err)
                }
                post.remove();
                resolve("Removed")
            })
        })
    },
    updatePost: function(id, field, value, callback) {
        return new Promise((resolve, reject) => {

            a = {};
            a[field] = value;
            Post.update({
                _id: id
            }, {
                $set: a
            }, function(err, post) {
                if (err) {
                    reject(err)
                }
                resolve(post)
            });
        })
    },
    getPostById: function(id, callback) {
        return new Promise((resolve, reject) => {

            Post.findById(id, function(err, post) {
                if (err) {
                    reject(err)
                }
                resolve(post)
            })
        })
    },


    getAnswers: function(callback) {
        return new Promise((resolve, reject) => {

            Answer.find(function(err, answers) {
                if (err) {
                    reject(err);
                }
                resolve(answers);
            });
        })
    },
    createAnswer: function(postObject, userId, postId, callback) {
        return new Promise((resolve, reject) => {
            var answer = new Answer(postObject);
            this.getUserById(userId).then(us => {
                answer.userId = us;
                console.log("Hola")
                Post.findById(postId, function(err, post) {
                    if (err) {
                        reject(err)
                    }
                    answer.postId = post;
                    answer.save(function(err, answer) {
                        if (err) {
                            reject(err);
                        }
                        us.answers.push(answer);
                        post.answers.push(answer);
                        us.save();
                        post.save();
                        resolve(answer);
                    });
                });



            });
        })
    },
    deleteAnswer: function(id, callback) {
        return new Promise((resolve, reject) => {

            Answer.findById(id, function(err, answer) {
                if (err) {
                    reject(err)
                }
                answer.remove();
                resolve("Removed")
            })
        })
    },
    updateAnswer: function(id, field, value, callback) {
        return new Promise((resolve, reject) => {

            a = {};
            a[field] = value;
            Answer.update({
                _id: id
            }, {
                $set: a
            }, function(err, answer) {
                if (err) {
                    reject(err)
                }
                resolve(answer)
            });
        })
    },
    getAnswerById: function(id, callback) {
        return new Promise((resolve, reject) => {

            Answer.findById(id, function(err, answer) {
                if (err) {
                    reject(err)
                }
                resolve(answer)
            })
        })
    },


    getComments: function(callback) {
        return new Promise((resolve, reject) => {

            Comment.find(function(err, comments) {
                if (err) {
                    reject(err);
                }
                resolve(comments);
            });
        })
    },
    createComment: function(postObject, userId, answerId, callback) {
        return new Promise((resolve, reject) => {

            var comment = new Comment(postObject);
            this.getUserById(userId, function(us) {
                console.log(us);
                if (!us) {
                    reject("User not found");
                }
                comment.userId = us;
                Answer.findById(answerId, function(err, answer) {
                    comment.answerId = answer;
                    comment.save(function(err, comment) {
                        if (err) {
                            reject(err);
                        }
                        us.comments.push(answer);
                        us.save();
                        answer.comments.push(comment);
                        answer.save();
                        resolve(answer);
                    });
                })
            });
        })
    },
    deleteComment: function(id, callback) {
        return new Promise((resolve, reject) => {

            Comment.findById(id, function(err, comment) {
                if (err) {
                    reject(err);
                }
                comment.remove();
                resolve("Removed")
            })
        })
    },
    updateComment: function(id, field, value, callback) {
        return new Promise((resolve, reject) => {

            a = {};
            a[field] = value;
            Comment.update({
                _id: id
            }, {
                $set: a
            }, function(err, comment) {
                if (err) {
                    reject(err)
                }
                resolve(comment)
            });
        })
    },
    getCommentById: function(id, callback) {
        return new Promise((resolve, reject) => {

            Comment.findById(id, function(err, comment) {
                if (err) {
                    reject(err)
                }
                resolve(comment)
            })
        })
    },

    getCommentsByUserId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Comment.find({
                userId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    },
    getCommentsByAnwersId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Comment.find({
                answerId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    },
    getPostsByUserId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Post.find({
                userId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    },
    getAnswersByUserId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Post.find({
                userId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    },
    getAnswersByPostId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Post.find({
                postId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    }
};