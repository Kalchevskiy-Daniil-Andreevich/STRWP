const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/name' && req.method === 'GET') {
        res.writeHead(200, 'utf8', {'Content-type' : 'text/plain'});
        res.end('Kalchevskiy Daniil Andreevich');
    } else {
        res.writeHead(404, {'Content-type' : 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})