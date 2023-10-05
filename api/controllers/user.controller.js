const User = require('../models/user.model')
const Contact = require('../models/contact.model')
const Post = require('../models/post.model')

const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: req.query,
      attributes: {
        exclude: ['password']
      }
    })

    return res.status(200).json(users)
  } catch (error) {
    console.log('Error getting all users')
    return res.status(500).json(error)
  }
}

const getOneUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: {
        exclude: ['password']
      },
      include: Contact   // Eager loading
    })

    if (!user) {
      return res.status(404).send('User not found')
    }
    //const contact = await user.getContact()  -> lazy loading
    return res.status(200).json(user)
  } catch (error) {
    console.log('Error getting one user')
    return res.status(500).json(error)
  }
}

const getOwnProfile = async (req, res) => {
  try {
    const user = await User.findByPk(res.locals.user.id, {
      attributes: {
        exclude: ['password']
      },
      include: [
          {
            model: Contact
          },
          {
            model: Post,
            as: 'posts'
          }
      ]
    })

    // const posts = await user.getPosts()
    // console.log(posts)
    if (!user) {
      return res.status(404).send('User not found')
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log('Error getting profile')
    return res.status(500).json({error: error.message})
  }
}

const createUser = async (req, res) => {
  try {
    const saltRounds = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_ROUNDS))
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
    req.body.password = hashedPassword

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

    res.status(200).json(user)
  } catch (error) {
    console.log('Error creating user')
    return res.status(500).json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const [user] = await User.update(req.body, {
      where: {
        id: req.params.userId
      }
    })
    if (!user) {
      return res.status(404).send('User not found')
    }
    return res.status(200).json({ message: 'User updated' })
  } catch (error) {
    console.log('Error updating user')
    res.status(500).json()
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.userId
      }
    }) 
    if (!user) {
      return res.status(404).send('User not found')
    }
    
    return res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    console.log('Error deleting user')
    res.status(500).json()
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  getOwnProfile,
  createUser,
  updateUser,
  deleteUser
}