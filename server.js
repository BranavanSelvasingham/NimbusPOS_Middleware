// =======================
// get the packages we need 
// =======================

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt    		= require('jsonwebtoken'); // used to create, sign, and verify tokens
var config 		= require('./config/config'); // get our config file
var app			= require('./app/app');
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; 

app.set('superSecret', config.secret); // secret variable
app.set('databaseURI', config.database);
app.set('opDatabaseURI', config.opDatabase);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// initialize database and models 
//    add all collections to app.settings.Collections
// =======================
require('./app/models/database');

// =======================
// initialize routes 
// =======================
require('./app/routes/routes_index')(app);

// =======================
// start the server
// =======================
app.listen(port);
console.log('Port:' + port);
