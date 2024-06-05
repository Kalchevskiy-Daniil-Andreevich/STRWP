const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const wss = new WebSocket.Server({ port: 4000 });

let clients = {};

app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/*', (req, res) => {
    res.status(400).send('Bad Request');
});
app.listen(3000, () => {
    console.log('HTTP server listening on port 3000');
});

wss.on('connection', function connection(ws) {
    const id = Math.random();
    clients[id] = ws;
    console.log(`New client connected with id ${id}`);

    ws.on('message', function (message) {
        let parsedMessage = JSON.parse(message);
        ws.username = parsedMessage.username;
        console.log(`Received message from ${parsedMessage.username}: ${parsedMessage.message}`);
        for (let clientId in clients) {
            clients[clientId].send(JSON.stringify(parsedMessage));
        }
    });

    ws.on('close', function () {
        const disconnectedUser = ws.username ? ws.username : 'Unknown User';
        delete clients[id];
        for (let clientId in clients) {
            clients[clientId].send(JSON.stringify({ username: disconnectedUser, message: ` left chat` }));
        }
    });
});


console.log('WebSocket server listening on port 4000')