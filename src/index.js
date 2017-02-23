import http from 'http';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser'
import passport from 'passport';
import mongoose from 'mongoose';

import apiRouter from './routes/api';
import authRouter from './routes/auth';
import jwtLogin from './config/passport';
import config from './config/config';
passport.use(jwtLogin);

let app = express();
app.use(helmet());
app.use(passport.initialize());

// Database Connection
mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

let server = http.createServer(app);
server.listen(process.env.PORT || config.port);
console.log(`Started on port ${server.address().port}`);
