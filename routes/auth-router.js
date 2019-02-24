'use strict';

const AuthController = require('../controllers/auth-controller'),
      express = require('express'),
      router = express.Router(),
      ac = new AuthController();

router
  .get('/', ac.index)
  .get('/login', ac.loginGet)
  .post('/login', ac.loginPost)
  .get('/signup', ac.signupGet)
  .post('/signup', ac.signupPost)
  .get('/logout', ac.logOut);

module.exports = router;