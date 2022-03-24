module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        }); 
        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
        Users.hasMany(models.Ratings, {
            onDelete: "cascade",
        });
    };

    return Users;
}