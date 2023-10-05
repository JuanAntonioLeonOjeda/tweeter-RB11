const router = require('express').Router()

const {
  createPost,
  likePost,
  getFans
} = require('../controllers/post.controller')

const {
  checkAuth
} = require('../utils/middelwares')

router
  .get('/:postId/fans', checkAuth, getFans)
  .post('/', checkAuth, createPost)
  .put('/:postId/like', checkAuth, likePost)

module.exports = router