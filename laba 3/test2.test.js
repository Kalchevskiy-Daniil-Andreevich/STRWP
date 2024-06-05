const http = require('http');
const url = require('url');
const factorial = require('./factorial');

describe('Factorial Server', () => {
    let server;

    beforeAll(() => {
        server = http.createServer((req, res) => {
            const queryObject = url.parse(req.url, true).query;
            if (queryObject.k) {
                const k = parseInt(queryObject.k);
                const fact = factorial(k);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ k: k, fact: fact }));
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Welcome to the factorial server! Please provide a number k as a parameter.');
            }
        });

        server.listen(5000);
    });

    afterAll(() => {
        server.close();
    });

    //[test]
    it('should return factorial of a number provided in query parameter', (done) => {
        http.get('http://localhost:5000?k=5', (res) => {
            expect(res.statusCode).toBe(200);

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const response = JSON.parse(data);
                expect(response.k).toBe(5);
                expect(response.fact).toBe(120);
                done();
            });
        });
    });

    //[test]
    it('should return a message if no query parameter is provided', (done) => {
        http.get('http://localhost:5000', (res) => {
            expect(res.statusCode).toBe(200);

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                expect(data).toBe('Welcome to the factorial server! Please provide a number k as a parameter.');
                done();
            });
        });
    });
});
