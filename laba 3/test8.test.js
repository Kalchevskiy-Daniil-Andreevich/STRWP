const thirdJob = require('./thirdJob');

describe('thirdJob function', () => {

    //[test]
    test('should reject with "error" if data is not a number', async () => {
        expect.assertions(1);
        try {
            await thirdJob('not a number');
        } catch (error) {
            expect(error).toBe('error');
        }
    });

    //[test]
    test('should resolve with "odd" if data is odd', async () => {
        expect.assertions(1);
        const result = await thirdJob(3);
        expect(result).toBe('odd');
    });

    //[test]
    test('should reject with "even" if data is even', async () => {
        expect.assertions(1);
        try {
            await thirdJob(4);
        } catch (error) {
            expect(error).toBe('even');
        }
    });
});
