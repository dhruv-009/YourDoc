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

    test('throws an error if database query fails', async () => {
        const spec = 'cardiology';

        const querySpy = jest.spyOn(db, 'query').mockRejectedValue(new Error('Query failed'));

        await expect(searchob.getDocSpec(spec)).rejects.toThrowError('Query failed');
        expect(querySpy).toHaveBeenCalledWith("SELECT * FROM doctor WHERE specialization = 'cardiology' and is_approved = 1");
    });
});

describe("searchDocByName", () => {
    test("should return the search result if doctor exists and is approved", async () => {
        const docName = "John";
        db.query = jest
            .fn()
            .mockImplementationOnce(() => [{ id: 1, name: "John", is_approved: true }]);

        const result = await searchob.searchName(docName);

        expect(db.query).toHaveBeenCalledWith(
            `SELECT * FROM doctor WHERE name = '${docName}' and is_approved = 1`
        );
        expect(result).toEqual({ result: [{ id: 1, name: "John", is_approved: true}]});
    });

    test("should return an empty array if no doctor was found", async () => {
        const docName = "Mike";
        db.query = jest.fn().mockImplementationOnce(() => []);

        const result = await searchob.searchName(docName);

        expect(db.query).toHaveBeenCalledWith(
            `SELECT * FROM doctor WHERE name = '${docName}' and is_approved = 1`
        );
        expect(result).toEqual({ result: [] });
    });
});