module.exports = (sequelize, Sequelize) => {
    const comment = sequelize.define("comment", {
        idImage: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        emailUser: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        postComment: {
            type: Sequelize.STRING
        }
    });

    return comment;
};
