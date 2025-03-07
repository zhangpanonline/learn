const sequelize = require('./db')
const { DataTypes } = require('sequelize')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


module.exports = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    age: {
        // 虚拟字段，不会在数据库中创建
        type: DataTypes.VIRTUAL,
        // 访问器
        get() {
            return dayjs.utc().diff(this.birthday, 'year')
        }
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(11),
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true
})