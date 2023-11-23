const { Sequelize } = require('sequelize')

const connection = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

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