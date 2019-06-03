/*
https://gist.github.com/zcaceres/2854ef613751563a3b506fabce4501fd
*/

const express = require('express');
const app = express();

app.get('/', function (req, res, next) {
  console.log('res.send(), res.json() and res.end() end the middleware chain');
  res.status(200).json({ dani: 'I am JASON Statham' });
});

app.get('/forbidden', function (req, res, next) {
  const err = new Error(`${req.ip} tried to access /Forbidden`);
  err.statusCode = 403;
  /*
    If next receives an argument, Express will assume there was an error, 
    skip all other routes, and send whatever was passed to any error-handling
     middleware you have defined.
  */
  next(err);
});

app.get('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
});

// You should put error-handling middleware at the end of your routes and middleware in your application
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) { 
    err.statusCode = 500;
  } // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.listen(3000);
