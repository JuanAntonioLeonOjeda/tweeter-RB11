const { Sequelize } = require('sequelize')

console.log(process.env.MYSQLUSER, process.env.MYSQLPASSWORD, process.env.MYSQLHOST, process.env.MYSQLPORT, process.env.MYSQL_DATABASE)
const connection = new Sequelize(`mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`);

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