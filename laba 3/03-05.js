const http = require('http');
const url = require('url');
const fs = require('fs');

function factorialAsync(n, callback) {
    if (n === 0 || n === 1) {
        setImmediate(() => callback(null, 1));
    } else {
        setImmediate(() => {
            factorialAsync(n - 1, (err, res) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, n * res);
                }
            });
        });
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
    } else if (parsedUrl.pathname === '/fact' && parsedUrl.query.k) {
        const k = parseInt(parsedUrl.query.k); 
        factorialAsync(k, (err, fact) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ k: k, fact: fact })); 
            }
        });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
    }
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
