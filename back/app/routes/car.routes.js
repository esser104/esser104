module.exports = app => {
    const car1 = require("../controllers/car.controller.js");

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", car1.create);

    // Retrieve all Tutorials
    router.get("/", car1.findAll);


    // Retrieve a single Tutorial with id
    router.get("/:id", car1.findOne);



    // Delete a Tutorial with id
    router.delete("/:id", car1.delete);

    app.use('/api/cars', router);
};
