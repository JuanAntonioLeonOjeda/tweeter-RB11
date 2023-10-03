require('dotenv').config()

const { checkConnection, syncModels } = require('./database/index')

const addRelations = require('./database/relations')

async function checkDB () {
  await checkConnection()
  addRelations()
  await syncModels()
}

checkDB()