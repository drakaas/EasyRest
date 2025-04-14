const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/users');  // Ensure the correct path to your User model
let dotenv = require('dotenv').config();
console.log(process.env.CLIENT_ID)
console.log(process.env.CLIENT_SECRET)
passport.use(new GoogleStrategy({
     clientID: process.env.CLIENT_ID,
     clientSecret: process.env.CLIENT_SECRET,
     callbackURL: "http://127.0.0.1:5000/auth/google/callback",
   },
   async (accessToken, refreshToken, profile, done) => {
     try {
       // Check for existing user by Google ID first
       let existingUser = await User.findOne({ googleId: profile.id });
       
       // If no user found by Google ID, check by email
       const email = profile.emails[0].value;
       if (!existingUser) {
         existingUser = await User.findOne({ email: email });
       }
 
       let user = existingUser;
       console.log(profile);
       
       if (!existingUser) {
         // Create new user if none exists
         user = await User.create({
           googleId: profile.id,
           email: email,
           username: profile.displayName,
           oauth: 'google'
         });
       } else if (!existingUser.googleId) {
         // If user exists by email but doesn't have a Google ID, update their record
         existingUser.googleId = profile.id;
         existingUser.oauth = existingUser.oauth ? `${existingUser.oauth},google` : 'google';
         await existingUser.save();
       }
       
       // Sign JWT
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
       user.token = token; // Attach token to user object
       
       return done(null, user);
     } catch (err) {
       return done(err, null);
     }
   }
 ));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});
