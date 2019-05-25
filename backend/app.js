// require('dotenv').config();
// https://github.com/shekhar94/rentmojo.git
const config = require('./config');
const express = require('express');
const app = express();
const session = require('express-session');
const request = require('request');
const qs = require('querystring');
const url = require('url');
const randomString = require('randomstring');

const port = config.PORT || 3000;
const redirect_uri = config.HOST + '/redirect';

app.use(express.static('views'));
app.use(
  session({
    secret: randomString.generate(),
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false
  })
);

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res, next) => {
  req.session.csrf_string = randomString.generate();
  const githubAuthUrl =
    'https://github.com/login/oauth/authorize?' +
    qs.stringify({
      client_id: config.CLIENT_ID,
      redirect_uri: redirect_uri,
      state: req.session.csrf_string,
      scope: 'user:email'
    });
  res.redirect(githubAuthUrl);
});

app.listen(port, () => {
  console.log('Server listening at port ' + port);
});
