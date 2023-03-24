const db = require('../services/db');
const bcrypt = require('bcrypt');
const helper = require('../helper');
const patient = require('../services/patient_login');
const doctor = require('../services/doctorlogin');
const admin = require('../services/adminlogin');


jest.mock('bcrypt', () => ({
    compare: jest.fn()
  }));
  
  jest.mock('../services/db', () => ({
    query: jest.fn()
  }));
  
  jest.mock('../helper', () => ({
    emptyOrRows: jest.fn()
  }));

describe('patientInfo function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns an error message when given wrong email and password', async () => {
    const email = 'nonexistent@example.com';
    const password = 'wrongpassword';
    const queryResult = [];

    db.query.mockResolvedValue(queryResult);
    helper.emptyOrRows.mockReturnValue(queryResult);

    const result = await patient.patientInfo({ email, password });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(helper.emptyOrRows).toHaveBeenCalledTimes(1);
    expect(helper.emptyOrRows).toHaveBeenCalledWith(queryResult);
    expect(result).toEqual({ message: 'Wrong email/password' });
  });

});