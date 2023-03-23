const db = require('../services/db');
const bcrypt = require('bcrypt');
const patient = require('../services/patientRegistration');
const doctor = require('../services/doctorRegistration');
const uuid = require('uuid');

// Mock the dependencies
jest.mock('bcrypt');
jest.mock('../services/db');

jest.mock('uuid', () => {
    return {
      v4: jest.fn(),
    };
  });
  

describe('createUserPatient', () => {
    test('should create a new patient', async () => {
        // Arrange
        const creds = {
          name: 'John',
          email: 'john@example.com',
          password: 'password',
          blood_group: 'A+'
        };
        const userId = 'cd9a66f9-c6a3-4d62-8744-e66114547b94';
        uuid.v4.mockReturnValueOnce(userId);
        bcrypt.hash.mockResolvedValueOnce('hashedPassword');
        db.query.mockResolvedValueOnce({ affectedRows: 1 });
        db.query.mockResolvedValueOnce({ affectedRows: 1 });
      
        // Act
        const result = await patient.createUserPatient(creds);
      
        // Assert
        expect(result).toEqual({ message: 'Patient added successfully', id: userId, email: creds.email });
        expect(bcrypt.hash).toHaveBeenCalledWith(creds.password, 7);
        expect(db.query).toHaveBeenCalledTimes(2);
        expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO user'));
        expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO patient'));
      });
});
