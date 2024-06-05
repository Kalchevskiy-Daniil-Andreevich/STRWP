//FORMS-аутентификацию на основе сессий с помощью пакета passport.
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');

const users = require('./users.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done) {
    let user = users.find((user) => user.username === username);
    if (user === undefined) {
      return done(null, false, { message: 'User not found' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Invalid password' });
    }
    return done(null, user);
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
  let user = users.find((user) => user.username === username);
  cb(null, user);
});

app.get('/login', (req, res) => {
  res.send('<form action="/login" method="post"><div><label>Username:</label><input type="text" name="username"/></div><div><label>Password:</label><input type="password" name="password"/></div><div><input type="submit" value="Log In"/></div></form>');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' }));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome, ${req.user.username}!`);
  } else {
    res.redirect('/login');
  }
});

app.use((req, res) => {
  res.status(404).send('Sorry, we cannot find that!');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
