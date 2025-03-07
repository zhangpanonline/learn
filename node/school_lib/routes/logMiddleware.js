const log4js = require('log4js')
const { apilogger } = require('../logger')

module.exports = log4js.connectLogger(apilogger, { level: 'auto' })