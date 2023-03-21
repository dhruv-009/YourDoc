const db = require('../services/db');
const searchob = require('../services/search');


describe('searchDocBySpec', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('returns approved doctors based on specialization', async () => {
      const spec = 'cardiology';
      const expectedResult = { result: { rows: [{id: 1, name: 'Dr. Smith', specialization: 'cardiology'}] }};
  
      const mockResult = { rows: [{id: 1, name: 'Dr. Smith', specialization: 'cardiology'}] };
      const querySpy = jest.spyOn(db, 'query').mockResolvedValue(mockResult);
  
      const result = await searchob.getDocSpec(spec);
  
      expect(querySpy).toHaveBeenCalledTimes(1);
      expect(querySpy).toHaveBeenCalledWith("SELECT * FROM doctor WHERE specialization = 'cardiology' and is_approved = 1");
  
      expect(result).toEqual(expectedResult);
    });

    test('returns empty list for unknown specialization', async () => {
        const spec = 'foot medicine';
        const expectedResult = { result: { rows: [] } };

        const mockResult = { rows: [] };
        const querySpy = jest.spyOn(db, 'query').mockResolvedValue(mockResult);

        const result = await searchob.getDocSpec(spec);

        expect(querySpy).toHaveBeenCalledTimes(1);
        expect(querySpy).toHaveBeenCalledWith("SELECT * FROM doctor WHERE specialization = 'foot medicine' and is_approved = 1");

        expect(result).toEqual(expectedResult);
    });
});
  