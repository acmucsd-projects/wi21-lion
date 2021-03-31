require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classRouter = require('./routes/class');
const sectionRouter = require('./routes/section');
const departmentRouter = require('./routes/department');
const organizationRouter = require('./routes/organization');
const enrollRouter = require('./routes/enroll');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/class', classRouter);
app.use('/section', sectionRouter);
app.use('/department', departmentRouter);
app.use('/organization', organizationRouter);
app.use('/enrolled_section', enrollRouter);

console.log(process.env.DB_URL);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});
mongoose.set("useCreateIndex", true);

module.exports = app;
