const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
let dotenv = require('dotenv').config()

passport.use(new GoogleStrategy({

     clientID:process.env.CLIENT_ID,
     clientSecret:process.env.CLIENT_SECRET,
     callbackURL:"http://127.0.0.1:3000/auth/google/callback",
     passReqToCallback:true
     },
     (request, accessToken, refreshToken, profile, done)=>{
          return done(null, profile);
     }
))


passport.serializeUser((user,done)=>{
     done(null,user);
})
passport.deserializeUser((user,done)=>{
     done(null,user);
})

