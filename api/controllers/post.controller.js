const Post = require('../models/post.model')
const User = require('../models/user.model')

const createPost = async (req, res) => {
  try {
    const user = await User.findByPk(res.locals.user.id)
    
    const post = await user.createPost(req.body)

    return res.status(200).json(post)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const likePost = async (req, res) => {
  try {
    const user = await User.findByPk(res.locals.user.id)
    const post = await Post.findByPk(req.params.postId)
     if (!post) {
      return res.status(404).send('Post not found')
     }

     post.likes++
     await post.save()
     
     await user.addPost(post)
     await post.addFan(user)

     return res.status(200).json(post)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getFans = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId)
    if (!post) {
      return res.status(404).send('Post not found')
    }

    const users = await post.getFans()
    return res.status(200).json(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  createPost,
  likePost,
  getFans
}