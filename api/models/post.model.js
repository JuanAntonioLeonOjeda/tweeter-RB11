const { DataTypes } = require('sequelize')
const { connection } = require('../../database/index')

const Post = connection.define('post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
},{
  updatedAt: false
})

module.exports = Post