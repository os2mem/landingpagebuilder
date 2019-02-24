'use strict';
//Aqui se configuran todas las variables y las opciones para levantar la aplicacion
const express = require('express'),
      path = require('path'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      morgan= require('morgan'),
      errors = require('../middlewares/errors'),
      auth = require('../routes/auth-router.js'),
      restFul = require('express-method-override')('_method'),
      createLanding = require('../routes/create-landing-router'),
      manageFiles = require('../routes/manage-files-router'),
      dashBoard = require('../routes/dashboard-routes'),
      viewDir = `${__dirname}/../views`,
      optSession = {
        secret: 'shhh',
        saveUninitialized: true,
        resave: true
      },
      formidable = require('express-formidable'),
      port = (process.env.PORT || 3000);


const app = express();

const favicon = require('serve-favicon')(`${__dirname}/../public/favicon.ico`),
      publicDir = express.static(`${__dirname}/../public`);

app
  .set( 'views', viewDir )
  .set( 'view engine', 'pug' )
  .set( 'port', port )
  .use( session(optSession))
  .use(bodyParser.json({ limit: '50mb' }) )
  .use(bodyParser.urlencoded({ limit: '50mb', extended: false }) )
  .use(restFul)
  .use( publicDir )
  .use( favicon )
  .use( morgan('dev') )
  .use( auth )
  .use( formidable({ keepExtensions: true }) )
  .use( dashBoard )
  .use( createLanding )
  .use(manageFiles)
  .use( errors.http404 );
  
module.exports = app;