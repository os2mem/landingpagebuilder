'use strict';

//Aqui se levanta el servidor
const app = require('./app'),
  server = app.listen(app.get('port'), () => console.log(`Iniciando API REST-MVC Express con MongoDB en el puerto ${app.get('port')}`));