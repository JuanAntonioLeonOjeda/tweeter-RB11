const User = require('../models/user.model')

const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
  try {
    const saltRounds = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_ROUNDS))
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
    req.body.password = hashedPassword

    const user = await User.create(req.body)

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  createUser
}