const express = require('express');
const app = express();

// App level middlewares
// app.use
// app.METHOD get post put

// Router / Route level middlewares

// 3rd party middlewares ( npm...)

// Error handling middlewares

app.use(function(req, res, next) {
  console.log('This middleware does stuff at app level');
  next();
});

app.get('/', function(req, res, next) {
  req.dani = 'dani';
  console.log('Setting dani to the request object');
  next();
}, function(req, res, next) {
  console.log('Printing dani: ', req.dani);
  next();
}, function(req, res, next) {
  console.log('res.send(), res.json() and res.end() end the middleware chain');
  res.status(200).json({ dani: 'I am JASON Statham' });
});

app.listen(3000);