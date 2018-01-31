// set up ======================================================================
var path = require('path');
var express = require('express');
var app = express(); 						// create our app w/ express
var port = 3333; 				// set the port
var ip = '127.0.0.1';
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');

// configuration ===============================================================

app.use(express.static(path.join(__dirname, 'build')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// routes ======================================================================
app.use(require('./server/controllers'));

// listen (start app with node server.js) ======================================
app.listen(port, ip);
console.log('App listening on port ' + port);
