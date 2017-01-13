import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';

import config from './config/config_dev';
import apiRouter from './routes/api/api';
import authRouter from './routes/auth/auth';
import passportStrategy from './config/passport';

const app = express();

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Log requests to console
app.use(morgan('dev'));

// Database Connection
mongoose.connect(config.database);

// Init passport
app.use(passport.initialize());
passportStrategy(passport);

// Routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Handle 404
app.get('*', function (req, res) {
  res.status(404);
  res.send({
    success: false,
    message: 'Page not found',
  });
});

// Handle 500
app.use(function (error, req, res, next) {
  res.status(500);
  next();
});

// Start the server
app.listen(config.port, function () {
  console.log(`Listening to port ${config.port}.`);
});
