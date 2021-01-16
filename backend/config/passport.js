const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/User')

// https://andrejgajdos.com/authenticating-users-in-single-page-applications-using-node-passport-react-and-redux/
passport.use(
    new LocalStrategy(
        {
            usernameField: 'user[NTUID]',
            passwordField: 'user[password]',
        },
        async (NTUID, password, done) => {
            User.findOne({ NTUID }).then((user) =>{
                if(!user || !user.validatePassword(password)) {
                    return done(null, false, { errors: { 'NTUID or password': 'is invalid' } });
                }
                return done(null, user);
            }).catch(done)
        }
    )
);