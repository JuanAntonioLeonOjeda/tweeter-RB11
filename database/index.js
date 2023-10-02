const { Sequelize } = require('sequelize')

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false
})

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