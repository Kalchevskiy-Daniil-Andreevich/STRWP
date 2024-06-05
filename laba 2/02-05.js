const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const FILE_PATH = path.join(__dirname, 'fetch.html');

const server = http.createServer((req, res) => {
    if (req.url === '/fetch') {
        fs.readFile(FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/api/name') {
        const responseData = JSON.stringify({ 
            lastName: 'Кальчевский', 
            firstName: 'Даниил', 
            middleName: 'Андреевич' 
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(responseData);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
