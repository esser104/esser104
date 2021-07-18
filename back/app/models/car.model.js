module.exports = (sequelize, Sequelize) => {
    const car = sequelize.define("car", {
        identity: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        imageURL: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        text : {
            type: Sequelize.STRING
        },

    });

    return car;
};
