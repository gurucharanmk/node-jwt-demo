import express from 'express';
import passport from 'passport';

const apiRouter = express.Router();

apiRouter.get('/simple', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json({ status: 1, message: 'A Simple API route' });
});

// module.exports = apiRouter;
export default apiRouter;
