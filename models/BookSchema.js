const mongoose = require('mongoose')
const BookSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  ISBN: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: null,
  },
  isTaken: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('books', BookSchema)
