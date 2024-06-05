const http = require('http');
const { parse } = require('querystring');
const db = require('./db');

const PORT = 5000;

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/api/db' && method === 'GET') {
        db.select()
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            })
            .catch(error => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            });
    } else if (url === '/api/db' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newData = JSON.parse(body);
            db.insert(newData)
                .then(insertedData => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(insertedData));
                })
                .catch(error => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                });
        });
    } else if (url === '/api/db' && method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedData = JSON.parse(body);
            db.update(updatedData)
                .then(result => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                })
                .catch(error => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                });
        });
    } else if (url.startsWith('/api/db') && method === 'DELETE') {
        const id = parseInt(parse(url.split('?')[1]).id);
        db.delete(id)
            .then(deletedData => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(deletedData));
            })
            .catch(error => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});