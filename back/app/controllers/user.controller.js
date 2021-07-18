const db = require("../models");
const userC = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a User
    const user1 = {
        email: req.body.email,
        name: req.body.name,
        session: req.body.session,
        password: req.body.password,
        token: req.body.token
    };

    // Save User in the database
    userC.create(user1)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    userC.findAll({where: condition})
        .then(data => {
            res.send(data);
            return data
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const mail = req.params.id;

    userC.findByPk(mail)
        .then(data => {
            if (data){
                console.log(data)
                res.send(data);
            }else {
                res.send({})
            }

        })
        .catch(err => {
            res.status(500).send([]);
        });
};
// Find a single User with an id
exports.authMdp = async (req, res) => {
    const email = req.params.id;


    const data = await userC.findByPk(email)
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + email
            });
        });
    console.log(data)

        // res.send("authentication")
        return data.token

};
