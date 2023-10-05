const User = require('../api/models/user.model')
const Contact = require('../api/models/contact.model')
const Post = require('../api/models/post.model')
const Comment = require('../api/models/comment.model')

function addRelations() {
  try {
    User.hasOne(Contact)
    Contact.belongsTo(User)

    User.hasMany(Comment)
    Comment.belongsTo(User)

    User.hasMany(Post, {as: 'posts'})
    Post.belongsTo(User)

    Post.hasMany(Comment)
    Comment.belongsTo(Post)

    User.belongsToMany(Post, { through: 'likes', as:'likedPosts', timestamps: false })
    Post.belongsToMany(User, { through: 'likes', as: 'fans', timestamps: false })
    
    console.log('Relations added')
  } catch (error) {
    throw new Error (error)
  }
}

module.exports = addRelations