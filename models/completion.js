module.exports = (sequelize, DataTypes) => {
    const Completion = sequelize.define('completion', {
        movieName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Completion
};