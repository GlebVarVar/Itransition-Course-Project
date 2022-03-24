module.exports = (sequelize, DataTypes) => {

    const Ratings = sequelize.define("Ratings", {
        Rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Ratings;
}