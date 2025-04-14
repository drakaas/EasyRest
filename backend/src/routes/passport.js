import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/users.js';
import passport from 'passport';
let dotenv = require('dotenv').config()

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret'
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id).select('-password');
      if (user) return done(null, user);
      else return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
