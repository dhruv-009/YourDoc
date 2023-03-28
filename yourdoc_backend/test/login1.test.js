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

  describe('patientInfo', () => {
    const mockUser = { id: 1, email: 'test@example.com', password: 'testpassword' };
    const mockPatient = { user_id: 1, name: 'Test Patient' };
  
    beforeEach(() => {
      db.query.mockClear(); // clear the mock implementation for each test
    });
  
    it('should return success message and user data if credentials are correct', async () => {
      // Mock the database query to return a user and patient
      db.query.mockResolvedValueOnce([{ ...mockUser, ...mockPatient }]);
      bcrypt.compare.mockResolvedValueOnce(true);
  
      const creds = { email: 'test@example.com', password: 'testpassword' };
      const result = await patient.patientInfo(creds);
  
      expect(db.query).toHaveBeenCalledWith(
        `SELECT * FROM user u, patient p where u.id=p.user_id and u.email='test@example.com'`
      );
      expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', mockUser.password);
      expect(result).toEqual({ data: { ...mockUser, ...mockPatient }, message: 'success' });
    });
  
    it('should return an error message if credentials are incorrect', async () => {
      // Mock the database query to not return any rows
      db.query.mockResolvedValueOnce([]);
  
      const creds = { email: 'test@example.com', password: 'wrongpassword' };
      const result = await patient.patientInfo(creds);
  
      expect(db.query).toHaveBeenCalledWith(
        `SELECT * FROM user u, patient p where u.id=p.user_id and u.email='test@example.com'`
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(result).toEqual({ message: 'Wrong email/password' });
    });
  
    it('should return an error message if database query throws an error', async () => {
      // Mock the database query to throw an error
      db.query.mockRejectedValueOnce(new Error('Database error'));
  
      const creds = { email: 'test@example.com', password: 'testpassword' };
      await expect(patient.patientInfo(creds)).rejects.toThrow('Database error');
    });
  });


describe('adminInfo function', () => {

  const creds = {
  email: 'example@mail.com',
  password: '123456'
  };
  
  test('should return a result object', async () => {
  db.query = jest.fn(() => Promise.resolve([{ id: 1, email: 'example@mail.com', password: '123456' }]));
  const result = await admin.adminInfo(creds);

  expect(db.query).toHaveBeenCalledTimes(2);
  expect(result).toEqual({result: [{ id: 1, email: 'example@mail.com', password: '123456' }], result1: undefined});
  });

  test('should throw an error for invalid email', async () => {
    db.query = jest.fn(() => Promise.resolve([]));
    await expect(admin.adminInfo(creds)).rejects.toThrowError('User not found');
    expect(db.query).toHaveBeenCalledTimes(1);
    });

  test('should throw an error for incorrect password', async () => {
      db.query = jest.fn().mockImplementation((query) => {
         if (query.includes('SELECT * FROM user WHERE email') && 
            query.includes(`AND password='${creds.password}'`)) {
            return Promise.resolve([]);
         }
         return Promise.resolve([{ id: 1, email: 'example@mail.com', password: '123456' }]);
      });
      await expect(admin.adminInfo(creds)).rejects.toThrowError('Password Not Matched');
  
      expect(db.query).toHaveBeenCalledTimes(2);
  });

});


describe('getById function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns user data when given valid email', async () => {
      const expectedRows = [{
        name: 'John Doe',
        type: 'patient',
        email: 'johndoe@example.com',
        password: 'password123',
        dob: '1990-01-01',
        address: '123 Main St',
        latlong: '0.000000,0.000000',
        blood_group: 'AB+'
      }];
      db.query.mockResolvedValue(expectedRows);
    
      const result = await patient.getById({ email: 'johndoe@example.com' });
    
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual({ result: expectedRows, message: 'User found successfully' });
    });

    test('returns an error message when user is not found', async () => {
      const email = 'nonexistent.user@example.com';
      db.query.mockResolvedValueOnce([]);
  
      const result = await patient.getById({ email });
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual({ result: [], message: 'User not found!' });
    });

  });


  describe('admin getById function', () => {

    test('should return a result object', async () => {
    db.query = jest.fn(() => Promise.resolve([{ name: 'John Doe', type: 'Doctor', specialization: 'Gynecologist', hospital_id: '543210' }]));
    const result = await admin.getById();
  
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(result).toEqual({result: [{ name: 'John Doe', type: 'Doctor', specialization: 'Gynecologist', hospital_id: '543210' }]});
    });

    test('should throw an error for empty result', async () => {
      db.query = jest.fn(() => Promise.resolve(null));
      await expect(admin.getById()).rejects.toThrowError('User not found');
    
      expect(db.query).toHaveBeenCalledTimes(1);
      });  
  });