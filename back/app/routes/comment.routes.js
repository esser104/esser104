module.exports = app => {
    const comms = require("../controllers/commment.controller.js");

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", comms.create);

    // Retrieve all Tutorials
    router.get("/:id", comms.findAll);

    // Delete a Tutorial with id
    router.delete("/:id", comms.delete);

    app.use('/api/comments', router);
};
