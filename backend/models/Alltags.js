module.exports = (sequelize, DataTypes) => {

    const Alltags = sequelize.define("Alltags", {
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Alltags;
}