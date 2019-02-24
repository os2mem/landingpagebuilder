'use strict';

const CreateLandingController= require('../controllers/create-landing-controller'),
  express = require('express'),
  router = express.Router(),
  clc = new CreateLandingController();

router
  .get('/create-landing', clc.index)
  .get('/create-landing/preview', clc.preview)
  .get('/create-landing/:read', clc.init)
  .post('/create-landing/save', clc.save);


module.exports = router;