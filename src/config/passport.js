import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/auth/auth';
import config from './config_dev';

// Setup work and export for the JWT passport strategy
export default function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret,
  };

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({
      _id: jwtPayload.id,
    }, (err, user) => {
      if (err) return done(err, false);
      if (user) {
        done(null, user);
      }
      done(null, false);
    });
  }));
}
