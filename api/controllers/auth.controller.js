const User = require('../models/user.model')
const Contact = require('../models/contact.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_ROUNDS))
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      user_name: req.body.user_name,
      birth_date: req.body.birth_date
    })

    const contact = await Contact.create({
      address: req.body.address,
      phone: req.body.phone,
      zip_code: req.body.zip_code
    })

    await user.setContact(contact)

    const payload = { email: req.body.email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({ token })  // === { token: token }
  } catch (error) {
    console.log('Error signing up user')
    return res.status(500).json(error)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      return res.status(404).send('Email or password wrong')
    }

    const checkPass = bcrypt.compareSync(req.body.password, user.password)

    if (checkPass) {
      const payload = { email: req.body.email }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
      return res.status(200).json({ token })  // === { token: token }
    } else {
      return res.status(404).send('Email or password wrong')
    }

  } catch (error) {
    console.log('Error login in')
    return res.status(500).json(error)
  }
}

module.exports = {
  signup,
  login
}