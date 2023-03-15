var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var doctorRouter = require('./routes/doctor');
var appointmentRouter = require('./routes/appointment');
var patientRouter = require('./routes/patient');
var patientLoginRouter = require('./routes/patient_login');
var doctorLoginRouter = require('./routes/doctorlogin');
var adminLoginRouter = require('./routes/adminlogin');
var registrationPatientRouter = require('./routes/patientRegistration');
var registrationDoctorRouter = require('./routes/doctorRegistration');
var authenticateUserRouter = require('./authenticateUser');
var cors = require('cors');
const dotenv = require('dotenv');
var app = express();

dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/patient_login', patientLoginRouter);
app.use('/doctorlogin', doctorLoginRouter);
app.use('/adminlogin', adminLoginRouter);
app.use('/user', userRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/appointment', appointmentRouter);
app.use('/patientRegistration', registrationPatientRouter);
app.use('/doctorRegistration', registrationDoctorRouter);
app.use(authenticateUserRouter);
module.exports = app;
