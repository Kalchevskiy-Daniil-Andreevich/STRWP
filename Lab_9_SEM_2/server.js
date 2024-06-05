const express = require('express');
const passport = require('passport');
const session = require('express-session');
const Strategy = require('passport-google-oauth20').Strategy;

const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = require('./config');

passport.use(new Strategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const app = express();

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.send('<a href="/auth/google">Login with google</a>');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/resource');
  }
);

app.get('/logout', (req, res, next) => {
  req.logout(() => {
    res.redirect('/login');
  });
});


app.get('/resource', isAuthenticated, (req, res) => {
  res.send(`RESOURCE - Authenticated user: ${JSON.stringify(req.user)}`);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});