const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const INDEX_HTML_PATH = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
    if (req.url === '/html') {
        fs.readFile(INDEX_HTML_PATH, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, {'Content-type' : 'text/plain'});
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, {'Content-type' : 'text/html'});
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