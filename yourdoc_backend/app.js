var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var doctorRouter = require('./routes/doctor');
var appointmentRouter = require('./routes/appointment');
var availabilityRouter = require('./routes/availability');
var patientRouter = require('./routes/patient');
var adminRouter = require('./routes/admin');
var cors = require('cors');
var searchRouter = require('./routes/search');
var app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true, methods: 'GET,PUT,POST,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/appointment', appointmentRouter);
app.use('/availability', availabilityRouter);
app.use('/admin', adminRouter);
app.use('/search', searchRouter);

module.exports = app;
