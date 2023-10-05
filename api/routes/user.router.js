const router = require('express').Router()

const {
  checkAuth,
  checkAdmin
} = require('../utils/middelwares')

const {
  getAllUsers,
  getOneUser,
  getOwnProfile,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller')

router
  .get('/', checkAuth, getAllUsers)
  .get('/profile', checkAuth, getOwnProfile)
  .get('/:userId', checkAuth, getOneUser)
  .post('/', checkAuth, checkAdmin, createUser)
  .put('/:userId', checkAuth, checkAdmin, updateUser)
  .delete('/:userId', checkAuth, checkAdmin, deleteUser)

module.exports = router