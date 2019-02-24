'use strict';

const DashBoardController = require('../controllers/dashboard-controller'),
  express = require('express'),
  router = express.Router(),
  db = new DashBoardController();

router
  .get('/dashboard', db.index);


module.exports = router;