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
const db = require('./db');
const bodyParser = require("body-parser");


const port = config.PORT || 3000;
const redirect_uri = config.HOST + '/redirect';
let dbConnection;

app.use(bodyParser.json());
app.use(express.static('views'));
app.use(
  session({
    secret: randomString.generate(),
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false
  })
);

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

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

app.post('/saveComments', (req, res, next) => {
  const comments = req.body.comments;
  const usrid = req.body.usrid;
  const findQ = { usrid };
  const updateQ = { $set: { comments, usrid } };
  dbConnection.collection('comments').update(findQ, updateQ, { upsert: true }, (err, result) => {
    if (err) res.json({ status: 'fail', msg: 'Error in updating comment' });
    else {
      res.json({ status: 'success', msg: 'Successfully updated comment' });
    }
  });
});

app.listen(port, () => {
  console.log('Server listening at port ' + port);
  db.connectDb().then(connection => {
    console.log('db connected successfully');
    dbConnection = connection;
  }).catch(err => {
    console.log(JSON.stringify(err));
  })
});
