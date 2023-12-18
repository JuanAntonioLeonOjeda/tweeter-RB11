const { Sequelize } = require('sequelize')

const connection = new Sequelize(`mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_TCP_PROXY_DOMAIN}:${process.env.RAILWAY_TCP_PROXY_PORT}/${process.env.MYSQL_DATABASE}`);

const checkConnection = async () => {
  try {
    await connection.authenticate()
    console.log('Connected to DB')
  } catch (error) {
    throw error
  }
}

const syncModels = async () => {
  try {
    await connection.sync()
    console.log('Models synched!')
  } catch (error) {
    throw error
  }
}

module.exports = {
  connection,
  checkConnection,
  syncModels
}