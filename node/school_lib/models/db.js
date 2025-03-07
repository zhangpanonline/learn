const { Sequelize } = require('sequelize')
const { sqllogger } = require('../logger')

const sequelize = new Sequelize('zhangpan', 'zhangpan', 'PWeoghCeb5vXIZB1', {
    host: 'mysql.sqlpub.com',
    dialect: 'mysql',
    logging: (sql) => sqllogger.debug(sql)
})

module.exports = sequelize