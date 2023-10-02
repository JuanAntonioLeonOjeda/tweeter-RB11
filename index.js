require('dotenv').config()

const { checkConnection, syncModels } = require('./database/index')

const User = require('./api/models/user.model')

async function checkDB () {
  await checkConnection()
  await syncModels()
}

checkDB()