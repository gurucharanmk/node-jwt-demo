import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/auth';
import config from './config';

// Setup work and export for the JWT passport strategy

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(opts, (jwtPayload, done) => {
  User.findOne({
    _id: jwtPayload.id,
  }, (err, user) => {
    if (err) return done(err, false);
    if (user) {
      done(null, user);
    }
    done(null, false);
  });
});

export default jwtLogin;
