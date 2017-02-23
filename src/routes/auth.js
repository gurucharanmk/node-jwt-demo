import express from 'express';

import authController from '../controller/authController';

const authRouter = express.Router();

/**
 * Register new users
 */
authRouter.post('/register', authController.register);

/**
 * Authenticate the user and get a JSON Web Token to include in the header for future requests.
 */
authRouter.post('/login', authController.login);

export default authRouter;
