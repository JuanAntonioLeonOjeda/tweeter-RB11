const { DataTypes } = require('sequelize')
const { connection } = require('../../database/index')

const Comment = connection.define('comment', {
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  updatedAt: false
})

module.exports = Comment