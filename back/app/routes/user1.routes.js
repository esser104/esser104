module.exports = app => {
  const user1 = require("../controllers/user.controller.js");
  const auth = require("../controllers/auth.controller.js")

  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/", user1.create);

  // Retrieve all Tutorials
  router.get("/", user1.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", user1.findOne);

  // //signIn
  // router.post("/signIn",auth.signup)
  //
  // //logIN
  // router.get("/logIn",auth.login)

  app.use('/api/users', router);
};
