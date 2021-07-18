module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    session: {
      type: Sequelize.BOOLEAN,
      defaultValue : false
    },
    email: {
        type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    },
  });

  return Users;
};
