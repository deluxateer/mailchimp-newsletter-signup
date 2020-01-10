const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/signup.html`)
})

app.post('/', function(req, res) {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email

  console.log(firstName, lastName, email)
})

const port = 3000;

app.listen(port, function() {
  console.log(`Server is running on port ${port}`)
})