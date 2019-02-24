'use strict';

const ManageFiles = require('../controllers/manage-files-controller'),
      express = require('express'),
      router = express.Router(),
      mf = new ManageFiles();

router
  .get('/manage-files', mf.getAll)
  .post('/upload', mf.addFile);
  

module.exports = router;