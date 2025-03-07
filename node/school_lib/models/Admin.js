const sequlize = require('./db.js')
const { DataTypes } = require('sequelize')

const Admin = sequlize.define('Admin', {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true
})

module.exports = Admin