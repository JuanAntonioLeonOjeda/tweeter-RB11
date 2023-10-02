const { DataTypes, DATE } = require('sequelize')
const { connection } = require('../../database/index')

const { isLongerThanFive, is18 } = require('../utils/validations')

const User = connection.define('user', {
  user_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      checkPass(value) {
        if (!isLongerThanFive(value)) {
          throw new Error ('Password must be at least 5 characters long')
        }
      }
    }
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      checkAge(value) {
        if (!is18(value)) {
          throw new Error ('Users must be at least 18 years old!')
        }
      }
    }
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
}, {
  timestamps: false
})

module.exports = User