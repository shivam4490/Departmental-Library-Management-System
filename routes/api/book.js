const { Router, response } = require('express')
const { findById } = require('../../models/BookSchema')
const router = Router()

const book = require('../../models/BookSchema')
const user = require('../../models/UserSchema')

router.post('/book/add', async (req, res) => {
  const { author, title, ISBN, type } = req.body
  console.log('Hello')

  try {
    const newbook = await book.create({ author, title, ISBN, type })
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

router.put('/book/issue/:id', async (req, res) => {
  try {
    const books = await book.findById(req.body.id)

    books.userId = req.params.id

    const users = await user.findById(req.params.id)
    books.username = users.name
    books.isTaken = true
    books.save()
    res.json({ books })
  } catch (err) {
    console.log(err)
  }
})

router.put('/book/return/:id', async (req, res) => {
  try {
    const books = await book.findById(req.params.id)
    books.userId = null
    books.username = null
    books.isTaken = false
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

module.exports = router
