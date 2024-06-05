const http = require('http');
const url = require('url');
const fs = require('fs');

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        fs.readFile('03-03.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (req.method === 'GET' && parsedUrl.pathname === '/fact' && parsedUrl.query.k) {
        const k = parseInt(parsedUrl.query.k); 
        const fact = factorial(k); 
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ k: k, fact: fact })); 
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
    }
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
