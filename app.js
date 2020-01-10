const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const { APIKey, listID } = require('./secrets')

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

  const data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  const jsonData = JSON.stringify(data)

  const options = {
    url: `https://us17.api.mailchimp.com/3.0/lists/${listID}`,
    method: 'POST',
    headers: {
      "Authorization": `someGuy ${APIKey}`
    },
    // body: jsonData
  }

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + '/failure.html')
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html')
      } else {
        res.sendFile(__dirname + '/failure.html')
      }
    }
  })
})

app.post('/failure', function(req, res) {
  res.redirect('/')
})

const port = 3000;

app.listen(port, function() {
  console.log(`Server is running on port ${port}`)
})