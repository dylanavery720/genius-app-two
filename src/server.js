const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('express-cors')
const app = express()

// app.use(cors())

const config = {
  clientId: "uY-l55ombZgi1T9IF1Jl5Cb3wGZqw9uC444WRPHPK6TOu6aIFELNvtIZA3HWqngr",
 redirectUri: "http://localhost:3000/callback",
 scope: "vote create_annotation manage_annotation me",
 clientSecret: process.env.GENIUS_CLIENT_SECRET
}

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', (request, response, next) => {
  let authUrl = `https://api.genius.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope}&state=&response_type=code`
  response.redirect(authUrl)
})

app.get('/callback', (req, res, next) => {
  let options = {
    url: 'https://api.genius.com/oauth/token',
    form: {
      code: req.query.code,
      client_secret: process.env.GENIUS_CLIENT_SECRET,
      grant_type: 'authorization_code',
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code'
    }
  }

  request.post(options, (error, response) => {
    console.log('status code:', response.statusCode)
    if (response.statusCode > 399) {
      console.log('error', error)
    } else {
      console.log(response.statusCode)
      let body = JSON.parse(response.body)
      console.log(body.access_token)
    }
  })
})

app.get('/test', (req, res, next) => {
  let ops = {
    url: 'https://api.genius.com/artists/16775/songs',
    headers: {
      Authorization: 'Bearer agb_8U_brbKx0JVa6wnGaRXczpiY71M908U8OtlymJrh5517JrPzVWqtWjQFEFrf',
      Accept: 'application/json',
    }
  }
  request.get(ops, (error, response) => {
    console.log(error)
    let body = JSON.parse(response.body)
    console.log(body.response.songs)
  })
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(3000, () => {
  console.log('go to http://localhost:3000/ and authenticate. Your access token will then appear in this console.')
})
