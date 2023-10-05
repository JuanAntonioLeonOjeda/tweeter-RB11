const router = require('express').Router()

const {
  checkAuth
} = require('../utils/middelwares')

const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller')

router
  .get('/', checkAuth, getAllUsers)
  .get('/:userId', checkAuth, getOneUser)
  .post('/', checkAuth, createUser)
  .put('/:userId', checkAuth, updateUser)
  .delete('/:userId', checkAuth, deleteUser)

module.exports = router