const express = require('express')
const expressServer = express()
require('dotenv').config()
const Router = require('./router')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

const PORT = 3000 ||process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//set static folder
app.use(express.static(path.join(__dirname, 'frontend')))






mongoose.connect(
  'mongodb://localhost/sortdb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err)
    else console.log('Mongoose connected successfully!')
  }
)

expressServer.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

expressServer.use(bodyParser.json())

expressServer.use('/api', Router)

expressServer.listen(8000)
