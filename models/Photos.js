module.exports = (sequelize, DataTypes) => {

    const Photos = sequelize.define("Photos", {
        Photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Preview: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Photos;
}