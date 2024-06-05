//Контроллеры обрабатывают запросы от клиента, взаимодействуя с представлением и сервисами, чтобы обеспечить нужный ответ. 
//Сервисы, в свою очередь, содержат бизнес-логику и взаимодействуют с базой данных или другими внешними сервисами при необходимости.
const express = require('express');
const sqlite3 = require('sqlite3');
const turtleController = require('./controllers/turtleController');
const weaponController = require('./controllers/weaponController');
const pizzaController = require('./controllers/pizzaController');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;
const db = new sqlite3.Database('./KDA.sqlite');

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use('/api', turtleController(db));
app.use('/api', weaponController(db));
app.use('/api', pizzaController(db));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        const turtleId = req.body.turtleId;
        const filename = `image-${turtleId}.jpg`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
    const { turtleId } = req.body;

    db.get('SELECT * FROM turtles WHERE id = ?', [turtleId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Turtle not found' });
        }

        const imagePath = path.join(__dirname, 'images', req.file.filename);

        db.run('UPDATE turtles SET image = ? WHERE id = ?', [imagePath, turtleId], (err) => {
            if (err) {
                return res.status(500).send('Error updating database');
            } else {
                return res.status(200).json({ message: 'Image uploaded successfully' });
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
