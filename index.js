require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { checkConnection, syncModels } = require('./database/index')

const addRelations = require('./database/relations')

async function checkDB () {
  await checkConnection()
  addRelations()
  await syncModels()
}

function startExpress () {
  const app = express()
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())

    .use('/api', require('./api/routes'))

    .listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`)
    })
}

;(async function startAPI () {
  await checkDB()
  startExpress()
})()
