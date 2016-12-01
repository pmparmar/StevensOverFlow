const newRoutes = require("./api");
const todoData = require('../data');

const constructorMethod = (app) => {
    app.use("/new", newRoutes);

    app.get("/", function (request, response) {
    	// console.log('no such todo')
        response.render("home", { todoItems: todoData.getAll()});
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;