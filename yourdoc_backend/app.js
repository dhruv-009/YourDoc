var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var doctorRouter = require('./routes/doctor');
var appointmentRouter = require('./routes/appointment');
var patientRouter = require('./routes/patient');
var patientLoginRouter = require('./routes/patient_login')
var doctorLoginRouter = require('./routes/doctorlogin')
var cors = require('cors');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/patient_login', patientLoginRouter);
app.use('/doctorlogin', doctorLoginRouter);
app.use('/user', userRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/appointment', appointmentRouter);
module.exports = app;
