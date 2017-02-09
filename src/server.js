const express = require('express');
const request = require('request');

const app = express()

const config = {
  clientId: "uY-l55ombZgi1T9IF1Jl5Cb3wGZqw9uC444WRPHPK6TOu6aIFELNvtIZA3HWqngr",
 redirectUri: "http://localhost:3000/callback",
 scope: "vote create_annotation manage_annotation me",
 clientSecret: process.env.GENIUS_CLIENT_SECRET
}

app.get('/', (request, response) => {
  let authUrl = `https://api.genius.com/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope}&state=&response_type=code`
  response.redirect(authUrl)
})

app.get('callback', (req, res) => {
  let options = {
    url: 'https://api.genius.com/oauth/token',
    form: {
      code: req.query.code,
      client_secret: process.env.GENIUS_CLIENT_SECRET,
      grant_type: 'authorization_code'
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code'
    }
  }
})

app.listen(3000, () => {
  console.log('go to http://localhost:3000/ and authenticate. Your access token will then appear in this console.')
})