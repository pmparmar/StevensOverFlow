const bcrypt = require('bcrypt-nodejs');
//const uuid = require('');
let users = {
	masterdetective123: {
		// encrypted using bcrypt
		// https://www.npmjs.com/package/bcrypt-nodejs
		password: "$2a$10$1uFYNxuDaGRdHFyINZ5vXuuj1g23fcKj/0D1MxtVCyQpuVPeVjtgS",
		alias: "Sherlock Holmes",
		firstName: "Sherlock",
		lastName: "Holmes",
		profession: "Detective",
		bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard."
	},
	lemon: {
		password: "$2a$10$N369wpJYkWpz.Vz42RZ/5eFcu7NN6xNaQ/937oKl8bvkpmMCQ163G",
		alias: "Liz Lemon",
		firstName: "Elizabeth",
		lastName: "Lemon",
		profession: "Writer",
		bio: "Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan."
	},
	theboywholived: {
		password: "$2a$10$g0Xy90Ou4Jg6SPjfk8nuHeewnxzOjJKjMHJSj4z5JTfIZdh7NpDmS",
		alias: "Harry Potter",
		firstName: "Harry",
		lastName: "Potter",
		profession: "Student",
		bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards
	}
}

module.exports = {
	getUserById: (id) => {
		return users[id];
	},
	verifyUserPass: (username, password) => {
		let user = users[username];
		if (!user)
			return {
				status: false,
				message: "User Name Not Found"
			};
		if (!bcrypt.compareSync(password, user.password))
			return {
				status: false,
				message: "User Password is Not Correct"
			};
		return {
			status: true,
			message: `${username} ${password}`
		};
	},
	/*addUser: (name, password, email)=>{
		let newUser = {
			name : name,
			password : password,
			email: email
		}
		users.push()
	}*/
}
