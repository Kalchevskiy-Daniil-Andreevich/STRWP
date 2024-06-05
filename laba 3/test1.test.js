const http = require('http');
const { getCurrentState, updateState } = require('./server');

describe('Server', () => {
    let server;

    beforeAll(() => {
        server = http.createServer((req, res) => {
            const currentState = getCurrentState();
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>${currentState}</h1>`);
        });
    });


    afterAll(() => {
        server.close();
    });

    //[test]
    it('should return the initial state', () => {
        expect(getCurrentState()).toBe('norm');
    });

    //[test]
    it('should update state correctly', () => {
        updateState('stop');
        expect(getCurrentState()).toBe('stop');
    });
});
