const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')

const users = require('./routes/api/users')

const app = express()

const bookrouter = require('./routes/api/book')
const upload = require('./routes/upload')

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

const dbURL =
  'mongodb+srv://shivam:shivam99090@cluster0.l3lw1.mongodb.net/library?retryWrites=true&w=majority'

//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Routes
app.use('/api/users', users)
app.use('/api', bookrouter)
app.use('/api/upload', upload)

const folder = path.resolve()
app.use('/uploads', express.static(path.join(folder, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server up and running on port ${port}`))
app.route('/', (req, res) => {
  res.send('Hello')
})
