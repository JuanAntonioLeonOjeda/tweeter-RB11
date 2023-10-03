const { DataTypes } = require('sequelize')
const { connection } = require('../../database/index')

const Contact = connection.define('contact', {
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.INTEGER,
    unique: true
  },
  zip_code: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
})

module.exports = Contact