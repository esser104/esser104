const db = require("../models");
const comment = db.comments;
const userControl = require("../controllers/user.controller")
const Op = db.Sequelize.Op;

// Create and Save a new comment
exports.create = async (req, res) => {
    // Create a comment
    const comment1 = {
        idImage: req.body.idImage,
        emailUser: req.body.emailUser,
        postComment: req.body.postComment,
        name:req.body.name
    };

        comment.create(comment1)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the comment."
                });
            });
    // Save comment in the database

};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {

    const validation = await userControl.authMdp(req, res)
    console.log(validation)
    if (validation !==undefined){
        const test=req.headers['authorization']===`Bearer ${validation}`
        if (test){
            const title = req.query.id;
            console.log(req.headers)
            let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

            comment.findAll({ where: condition },{include : "postComment"})
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving tutorials."
                    });
                });
        }else {
           res.send('auth not valid')
        }
    }

};

// Find a single comment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    comment.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving comment with id=" + id
            });
        });
};

// Delete a comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete comment with id=" + id
            });
        });
};
