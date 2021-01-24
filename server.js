const express = require('express')
var logger = require('morgan')
const getAllWords = require('./findAnagram')
const _ = require('lodash')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/api/ag/:letters', async (req, res) => {
  const { letters } = req.params
  let words = getAllWords(letters, 3)
  words = _.orderBy(words, (word) => word.length, 'desc')
  return res.json(words)
})

var http = require('http')
var port = process.env.PORT || '5000'

app.set('port', port)
var server = http.createServer(app)

server.listen(port)
server.on('listening', () => {
  console.log(`listening on ${port}`)
})
