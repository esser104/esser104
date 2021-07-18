const db = require("../models");
const cars = db.cars;
const Op = db.Sequelize.Op;

// Create and Save a new cars
exports.create = (req, res) => {
    // Validate request
    if (!req.body.identity && !req.body.imageURL) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a cars
    const car1 = {
        identity: req.body.identity,
        imageURL: req.body.imageURL,
        text: req.body.text,
    };

    // Save cars in the database
    cars.create(car1)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the cars."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.id;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    cars.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single cars with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    cars.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving cars with id=" + id
            });
        });
};

// Delete a cars with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    cars.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "cars was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete cars with id=" + id
            });
        });
};
