const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/users');  // Ensure the correct path to your User model
let dotenv = require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });

      let user = existingUser;
      if (!existingUser) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          oauth: 'google'
        });
      }

      // Sign JWT here
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      user.token = token; // Optional: attach token to user object

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});
