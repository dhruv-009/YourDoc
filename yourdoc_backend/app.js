const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const doctorRouter = require('./routes/doctor');
// const appointmentRouter = require('./routes/appointment');
const availabilityRouter = require('./routes/availability');
const patientRouter = require('./routes/patient');
const patientLoginRouter = require('./routes/patient_login');
const doctorLoginRouter = require('./routes/doctorlogin');
const adminLoginRouter = require('./routes/adminlogin');
const registrationPatientRouter = require('./routes/patientRegistration');
const registrationDoctorRouter = require('./routes/doctorRegistration');
// const search = require('./routes/search (1)');
const authenticateUserRouter = require('./authenticateUser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const adminRouter = require('./routes/admin');
const searchRouter = require('./routes/search');
const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true, methods: 'GET,PUT,POST,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));
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
// app.use('/appointment', appointmentRouter);
app.use('/patientRegistration', registrationPatientRouter);
app.use('/doctorRegistration', registrationDoctorRouter);
// app.use('/search', search);
app.use(authenticateUserRouter);
app.use('/availability', availabilityRouter);
app.use('/admin', adminRouter);
app.use('/search', searchRouter);

module.exports = app;
