//APP.JS
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/auth');
const companiesRouter = require('./routes/api/companies');
const studentsRouter = require('./routes/api/students');
const jobsRouter = require('./routes/api/jobs');
const profileRouter = require('./routes/api/profile');

mongoose
  .connect('mongodb+srv://arjcrs:CJWeBLqmzlnAaUBh@arjcrs.vfpvp3w.mongodb.net/')
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error));

const app = express();
const appUrl = 'https://arjcrs-two.vercel.app/';

app.use(helmet());
app.use(logger('dev'));

// Enable CORS
app.use(cors({
  origin: appUrl, // Allow requests from this origin
  methods: ["POST", "GET", "PUT","DELETE","PATCH"], // Allow these HTTP methods
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', authRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/students', studentsRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/profile', profileRouter);

// Catching 404 Error
app.use((req, res, next) => {
  const error = new Error('INVALID ROUTE');
  error.status = 404;
  next(error);
});

// Error handler function
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use('/', (req, res) => {
  res.status(200).json(_response);
});

app.use((req, res) => res.status(404).send('404 - Not Found'));

module.exports = app;
