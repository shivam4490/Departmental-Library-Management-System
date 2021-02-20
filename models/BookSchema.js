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
})

module.exports = mongoose.model('books', BookSchema)
