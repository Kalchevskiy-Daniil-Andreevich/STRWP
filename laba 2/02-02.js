const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const FILE_PATH = path.join(__dirname, 'pic.png');

const server = http.createServer((req, res) => {
    if (req.url === '/png' && req.method === 'GET') {
        fs.readFile(FILE_PATH, (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, {'Content-type' : 'text/plain'});
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, {'Content-type' : 'image/png'});
            res.end(data);
        })
    } else {
        res.writeHead(404, {'Content-type' : 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})