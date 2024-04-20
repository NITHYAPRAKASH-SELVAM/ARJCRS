const express = require('express');
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');
dotenv.config()

const authRouter = require('./src/routes/api/auth');
const companiesRouter = require('./src/routes/api/companies');
const studentsRouter = require('./src/routes/api/students');
const jobsRouter = require('./src/routes/api/jobs');
const profileRouter = require('./src/routes/api/profile');

let appUrl = 'https://arjcrs-two.vercel.app';
//MIDDILWARES
const app = express();
let server = http.createServer(app);
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors(
     {
        origin: [appUrl],
        methods: ["POST", "GET","PUT","DELETE","PATCH"],
        credentials: true
    }
));
app.use(morgan('dev'))
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


app.use((req, res) => res.status(404).send('404 - Not Found'));
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://arjcrs:CJWeBLqmzlnAaUBh@arjcrs.vfpvp3w.mongodb.net')
.then(() => {
    _response.database = "Healthy";
    console.log("Database Connected");
    console.log("Server Started on PORT", PORT);
})
.catch((err) => {
    _response.database = "Unhealthy";
    console.log("Error in connecting to DataBase", err.message);
});

let _response = {}
app.use('/', (req, res) => {
  res.status(200).json(_response);
});

server.listen(PORT, ()=>{
  _response.server = "Healthy"
})