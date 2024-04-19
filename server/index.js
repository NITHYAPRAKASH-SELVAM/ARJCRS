//INDEX.JS
// const app = require('./src/app');
// const HOST = process.env.HOST || 'localhost';
// const PORT = process.env.PORT || 8080;
// console.log(HOST)
// app.listen(HOST);
// console.log(`Running on http://${HOST}:${PORT}`);
//APP.JS
express = require('express');
const http = require('http')
const socket =  require('socket.io')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');
dotenv.config()

const authRouter = require('./src/routes/api/auth');
const companiesRouter = require('./src/routes/api/companies');
const studentsRouter = require('./src/routes/api/students');
const jobsRouter = require('./src/routes/api/jobs');
const profileRouter = require('./src/routes/api/profile');

mongoose
  .connect('mongodb+srv://arjcrs:CJWeBLqmzlnAaUBh@arjcrs.vfpvp3w.mongodb.net/')
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error));

let appUrl = 'https://arjcrs-two.vercel.app';
//MIDDILWARES
const app = express();
let server = http.createServer(app);
let io = socket(server);
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors(
     {
        origin: [appUrl],
        methods: ["POST", "GET","PUT"],
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

app.use('/', (req, res) => {
  res.status(200).json(_response);
});

app.use((req, res) => res.status(404).send('404 - Not Found'));
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
  _response.server = "Healthy"
})