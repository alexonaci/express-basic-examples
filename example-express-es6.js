const express = require('express');
const app = express();

// App level middlewares
// app.use
// app.METHOD get post put

// Router / Route level middlewares

// 3rd party middlewares ( npm...)

// Error handling middlewares

const setDaniMiddleware = () => (req, res, next) => {
  req.dani = 'dani';
  console.log('Setting dani to the request object');
  next();
}

const printDaniMiddleware = () => (req, res, next) => {
  console.log('Printing dani: ', req.dani);
  next();
}

const sendDaniMiddleware = () => (req, res, next) => {
  console.log('res.send(), res.json() and res.end() end the middleware chain');
  res.status(200).json({ dani: 'I am JASON Statham' });
}

// ( function that returns a function! ;) )
const doStuffBeforeMiddleware = () => (req, res, next) => {
  console.log('This middleware does stuff at app level');
  next();
}

app.use(doStuffBeforeMiddleware());

app.get('/', setDaniMiddleware(), printDaniMiddleware(), sendDaniMiddleware());