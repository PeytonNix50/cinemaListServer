module.exports = (sequelize, DataTypes) => {
    const Planning = sequelize.define('planning', {
        movieName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        interest: {
            type: DataTypes.STRING,
            allowNull: true
        },
        progress: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Planning
};