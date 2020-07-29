const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const passport = require('passport');
const app = express();
const port = 8000;

require('./passport-config');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public'));
app.use(
    session({
        secret: 'obobNMN23h',
        store: new fileStore(),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        },
        resave: false,
        saveUninitialized: false
    })
)
app.use(passport.initialize());
app.use(passport.session());

const auth = (req, res, next) =>{
 if(req.isAuthenticated()){
next()
 }  else{
     return res.redirect('/')
 } 
}
app.get('/', (req, res) => res.send('Main page'));
app.get('/admin', auth, (req, res) => res.send('Admin page'));
app.get('/logout', auth, (req, res) => {
req.logout();
res.redirect('/');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('Send correct email or password');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin');
        });
    })(req, res, next);
});

app.listen(port, () => console.log(`Server is listening on ${port}`))