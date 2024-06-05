//FORMS- аутентификацию на основе jwt-токена
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const users = require('./users.json');

const app = express();
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ username: user.username }, 'secret', { expiresIn: '10m' });
    res.json({ accessToken });
  } else {
    res.status(401).send('Неправильный логин или пароль');
  }
});

app.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(401).send('Невалидный токен');
    res.send(`Welcome, ${user.username}!`);
  });
});

app.use((req, res) => {
  res.status(404).send('Sorry, we cannot find that!');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
