const uuid = require('node-uuid');
const bcrypt = require("bcrypt-nodejs");
var posts = [{
    _id: 1,
    title: "java",
    body: "Java's body"
}, {
    _id: 2,
    title: "cpp",
    body: "Cpp's body"
}]

let ans = [{

    _id: 12,
    userid: 8,
    title: 'This is a esay question',
    body: 'I am a answer boyd, my id is 12, I belong to post 122, hahahah',
    postid: 122,
    vote: 10


}, {

    _id: 11,
    userid: 7,
    title: 'This is a very esay question',
    body: 'I am anothoer answer boyd, my id is 11, I belong to post 121, hei hei hei',
    postid: 121,
    vote: 10

}]


let p = [{

    _id: 122,
    userid: 8,
    title: 'Java post1',
    body: 'Oh, java is so hard',
    vote: 10,

}, {

    _id: 121,
    userid: 7,
    title: 'java post2',
    body: 'Oh, java is so so hard',
    vote: 10,

}]

let resp = [{

    _id: 120,
    userid: 8,
    title: 'result Java post1',
    body: 'Oh, here is whta you search java is so hard',
    vote: 10,

}, {

    _id: 119,
    userid: 7,
    title: 'result java post2',
    body: 'Oh,  here is whta you search java is so so hard',
    vote: 10,

}]






var user = [{
        _id: uuid.v4(),
        myid: 1,
        username: 'masterdetective123',
        displayname: 'Sherlock Holmes',
        First_Name: 'Sherlock',
        Last_Name: 'Holmes',
        Profession: 'Detective',
        Bio: 'Sherlock Holmes(/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle.Known as a "consulting detective" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.',
        Password: '$2a$10$BoT5q0.lXtM3..qi60f.oe/VpxbTz6LuaF5tHZ8FkprydmKUGT0pW'
    }, {
        _id: uuid.v4(),
        myid: 2,
        username: 'lemon',
        displayname: 'Liz Lemon',

        First_Name: 'Elizabeth',
        Last_Name: 'Lemon',
        Profession: 'Writer',
        Bio: 'Elizabeth Miervaldis "Liz" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.',
        Password: '$2a$10$G5n7HVXriS/.MV8tpJrczOqaoqmwuF/4SEZe.H9wzV0JKLPlJVihe'
    },

    {
        _id: uuid.v4(),
        myid: 3,
        username: 'theboywholived',
        displayname: 'Harry Potter',
        First_Name: 'Harry',
        Last_Name: 'Potter',
        Profession: 'Student',
        Bio: 'Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry\'s struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.',
        Password: '$2a$10$RMPATnIsGSNWt/zS0hte8emsI4zsPOcPdw1aAyM.2AVQr/GBmmOk2'
    }, {
        _id: uuid.v4(),
        myid: 4,
        username: 'qiaofeng1060',
        displayname: 'Qiao Feng',
        First_Name: 'Feng',
        Last_Name: 'Qiao',
        Profession: 'Chief of the Beggars\' Sect',
        Bio: 'Qiao Feng is the charismatic chief of the Beggars\' Sect who possesses strong leadership qualities and exceptional prowess in martial arts. He falls from grace after he is revealed to be a Khitan, and after he is wrongly accused of murdering some fellow martial artists. He becomes an outcast of the wulin (martial artists\' community) of the Han Chinese-dominated Song Empire, which is at war with the Khitan-led Liao Empire. Qiao Feng\'s relations with the Han Chinese martial artists worsen due to the Song–Liao conflict, and also because he is now seen as a murderer and a threat to the wulin. He is forced to sever ties with them and engage them in a one-against-several battle, in which he singlehandedly kills many opponents, including some of his old friends and acquaintances.',
        Password: '$2a$10$/rIi.BLtPzlEaT8y9KeKx.R2/LQGs48PPRnbY2r7yRD5R0Nqx3Zae'
    }, {
        _id: uuid.v4(),
        myid: 5,
        username: 'huangyingting',
        displayname: '黄颖婷',
        First_Name: 'YingTing',
        Last_Name: 'Huang',
        Profession: 'Daughter',
        Bio: 'Famous new master student of 2016 fall, majoring EE.',
        Password: '$2a$10$QgzHWH0xxEpVwcshvb/Q3.MHYjSGvMy6QotaV5GeuUZ.7FW4lXDYi'
    }

]


exports.findOne = function(username, password) {
    console.log('findone called new');
    let usr = user.filter(x => x.username === username).shift();
    if (!usr)
        return Promise.reject("No user found");

    if (bcrypt.compareSync(password, usr.Password)) {
        console.log('Bingo! username hashedPassword both mathed');
        return Promise.resolve(usr);
    } else {
        console.log("Wrong password");
        return Promise.reject("Wrong password");
    }


}

exports.findtest = function() {

    let res = user.filter(x => x.username === 'masterdetective123').shift();
    return Promise.resolve(res);

}


exports.findById = function(id) {
    console.log('findById called');

    let res = user.filter(x => x._id === id).shift();
    if (!res)
        return Promise.reject("No user found");

    return Promise.resolve(res);

}


exports.finduserbyid = function(id) {

    let user = {
        _id: 1,
        username: leiduan,
        passowrd: aijuner0201
    }
    return Promoise.resolve(user)
        // body... 
};

exports.DefaultSearch = function(user) {
	console.log('DefaultSearch called')

    //harcoding now
    return Promise.resolve(p)
        // body... 
};

exports.findpostbyid = function(id) {

    let p = {

        _id: 123,
        userid: 8,
        title: 'Here is a single post for testing render',
        body: 'Oh, here is a singple post \' body,  html is so hard, i am dying\nhtml is so hard, i am dying\nhtml is so hard, i am dying I stay out too late, got nothing in my brain That\'s what people say, that\'s what people say I go on too many dates, but I can\'t make them stay At least that\'s what people say, that\'s what people say But I keep cruising Can\'t stop, won\'t stop moving It\'s like I got this music in my mind Saying it\'s gonna be alright Cause the players gonna play, play, play, play, play And the haters gonna hate, hate, hate, hate, hate Baby, I\'m just gonna shake, shake, shake, shake, shake I shake it off, I shake it off Heartbreakers gonna break, break, break, break, break And the fakers gonna fake, fake, fake, fake, fake Baby, I\'m just gonna shake, shake, shake, shake, shake I shake it off, I shake it off I never miss a beat, I\'m lightning on my feet And that\'s…\n',
        vote: 10,

    }
    return Promise.resolve(p);
    /* body... */
}

exports.findanswerbypostid = function(id) {




    return Promise.resolve(ans);


}

exports.SearchPost = function(query) {

    return Promise.resolve(resp);
}

exports.database = require('./database.js');