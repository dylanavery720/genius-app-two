const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('express-cors')
const app = express()


const bonfig = {
  clientId: "uY-l55ombZgi1T9IF1Jl5Cb3wGZqw9uC444WRPHPK6TOu6aIFELNvtIZA3HWqngr",
 redirectUri: "http://localhost:9000/test",
 scope: "vote create_annotation manage_annotation me",
 clientSecret: process.env.GENIUS_CLIENT_SECRET
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

// app.use(express.static('../build'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', (request, response, next) => {
  let authUrl = `https://api.genius.com/oauth/authorize?client_id=${bonfig.clientId}&redirect_uri=${bonfig.redirectUri}&scope=${bonfig.scope}&state=&response_type=code`
  response.redirect(authUrl)
})

app.get('/callback', (req, res, next) => {
  let options = {
    url: 'https://api.genius.com/oauth/token',
    form: {
      code: req.query.code,
      client_secret: process.env.GENIUS_CLIENT_SECRET,
      grant_type: 'authorization_code',
      client_id: bonfig.clientId,
      redirect_uri: bonfig.redirectUri,
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
      Authorization: 'Bearer j4DQ4ILmQIj07lZA6P_j_2ZjTrG_db2Bxg2aIvLN7tVaq0UxgSgqh8He1T3o28UM',
      Accept: 'application/json',
    }
  }
  request.get(ops, (error, response) => {
    console.log(error)
    let body = JSON.parse(response.body)
    console.log(body.response.songs)
  })
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.listen(9000, () => {
  console.log('go to http://localhost:9000/ and authenticate. Your access token will then appear in this console.')
})

// app.listen(9000, () => {
//   console.log('go to http://localhost:3000/ and authenticate. Your access token will then appear in this console.')
// })
