import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/auth/auth';
import config from '../../config/config_dev';

const authRouter = express.Router();

/**
 * Register new users
 */
authRouter.post('/register', function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: 'Error:Invaid email/passwrd enty',
    });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      //createdAt:Date.now()
    });

    // An attempt to save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          message: 'Error: Email id already exist in our records',
        });
      }
      res.json({
        success: true,
        message: 'Success: Account created',
      });
    });
  }
});

/**
 * Authenticate the user and get a JSON Web Token to include in the header for future requests.
 */
authRouter.post('/login', function (req, res) {
  User.findOne({
    email: req.body.email,
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.send({
        success: false,
        message: 'Error: User not found',
      });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          console.log(user);
          const payload = { id: user._id };
          const token = jwt.sign(payload, config.secret, {
            expiresIn: '2 days',
          });
          res.json({
            success: true,
            message: 'Success: Authentication successfull',
            token,
          });
        } else {
          res.send({
            success: false,
            message: 'Error: Password is invalid',
          });
        }
      });
    }
  });
});

export default authRouter;
