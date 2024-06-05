const firstJob = require('./firstJob');

describe('firstJob function', () => {

    //[test]
    test('should resolve with "Hello World" after 2000ms', async () => {
        expect.assertions(1);
        const result = await firstJob();
        expect(result).toBe('Hello World');
    });

    //[test]
    test('should handle errors properly', async () => {
        expect.assertions(1);
        try {
            await firstJob();
            expect(true).toBeTruthy();
        } catch (error) {
            expect(false).toBeTruthy();
        }
    });
});