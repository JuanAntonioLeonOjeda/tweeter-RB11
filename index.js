require('dotenv').config()
const express = require('express')

const { checkConnection, syncModels } = require('./database/index')

const addRelations = require('./database/relations')

async function checkDB () {
  await checkConnection()
  addRelations()
  await syncModels()
}

function startExpress () {
  const app = express()
  
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
}

async function startAPI () {
  await checkDB()
  startExpress()
}

startAPI()