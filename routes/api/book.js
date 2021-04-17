const { Router, response } = require('express')
const { findById } = require('../../models/BookSchema')
const router = Router()
const jwt = require('jsonwebtoken')

const book = require('../../models/BookSchema')
const user = require('../../models/UserSchema')

router.post('/book/add', async (req, res) => {
  const { author, title, ISBN, type, Image } = req.body
  console.log('Hello')

  try {
    const newbook = await book.create({ author, title, ISBN, type, Image })
    if (!newbook) {
      return res.status(400).json({ err: 'not created' })
    }
    res.json({ newbook })
  } catch (err) {
    console.log(err)
  }
})

router.get('/book/get', async (req, res) => {
  try {
    const books = await book.find({})
    res.json({ books })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/book/:id', async (req, res) => {
  try {
    const books = await book.findByIdAndDelete(req.params.id)
    res.json({ msg: 'book has been deleted' })
  } catch (err) {
    console.log(err)
  }
})

router.put('/book/issue/:id', async (req, res) => {
  try {
    const books = await book.findById(req.body._id)

    books.userId = req.body.userId
    books.issueDate = req.body.issueDate
    books.returnDate = req.body.returnDate

    const users = await user.findById(req.body.userId)
    books.username = users.name
    books.isTaken = true
    books.save()
    res.json({ books })
  } catch (err) {
    console.log(err)
  }
})

router.get('/book/getissuedbooks', async (req, res) => {
  try {
    const books = await book.find({ isTaken: true })
    res.json({ books })
  } catch (error) {
    console.log(error)
  }
})

router.get('/book/getavailablebooks', async (req, res) => {
  try {
    const books = await book.find({ isTaken: false })
    res.json({ books })
  } catch (error) {
    console.log(error)
  }
})

router.get('/book/getuserbooks', async (req, res) => {
  const auth = req.header('Authorization')
  console.log(auth)
  const token = auth.split(' ')[1]
  if (!token || token === '' || token === null) {
    return res.status(401).json({ message: 'You need to be logged in' })
  }
  const decode = await jwt.verify(token, 'secret')
  console.log(decode)

  try {
    console.log(decode.id)
    const books = await book.find({ isTaken: true, userId: decode.id })
    console.log(books, decode.id)
    res.json({ books })
  } catch (error) {
    console.log(error)
  }
})

router.put('/book/return', async (req, res) => {
  try {
    console.log(req.body)
    const books = await book.findById(req.body._id)
    books.userId = null
    books.username = null
    books.isTaken = false
    books.save()
    res.json({ books })
  } catch (err) {
    console.log(err)
  }
})

router.put('/book/:id', async (req, res) => {
  const { author, title, ISBN, type } = req.body

  try {
    const books = await book.findById(req.params.id)
    if (author) books.author = author
    if (title) books.title = title
    if (ISBN) books.ISBN = ISBN
    if (type) books.type = type

    books.save()
    res.json({ books })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
