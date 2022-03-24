module.exports = (sequelize, DataTypes) => {

    const Photos = sequelize.define("Photos", {
        Rating: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Photos;
}