const http = require('http');
const url = require('url');

function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url,true).query;
    if (queryObject.k) {
        const k = parseInt(queryObject.k);
        const fact = factorial(k);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({k: k, fact: fact}));
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to the factorial server! Please provide a number k as a parameter.');
    }
});

server.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});
