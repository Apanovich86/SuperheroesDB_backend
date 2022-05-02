const {DataTypes} = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    const Hero = sequelize.define('hero', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nickname: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        real_name: {
            type: DataTypes.STRING
        },
        origin_description: {
            type: DataTypes.STRING
        },
        superpowers: {
            type: DataTypes.STRING
        },
        catch_phrase: {
            type: DataTypes.STRING
        },
        images: {
            type: DataTypes.STRING, allowNull: true
        }
    });

    return Hero;
}