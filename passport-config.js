const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const userDB = {
    id: 1,
    email: 'st@st',
    password: '123'

}

passport.serializeUser((user, done) => {
    console.log('Сериализация');
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    console.log(`Десериализация ${id}`);
    const user = (userDB.id === id) ? userDB : false;
    done(null, user);
});


passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
        if (email === userDB.email && password === userDB.password) {
            return done(null, userDB)
        } else {
            return done(null, false)
        }
}));