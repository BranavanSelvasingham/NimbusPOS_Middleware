var app	= require('../app');
var nimbus = require('../nimbus/nimbus');
var jwt = require('jsonwebtoken');

var middleware = {
	checkIfTokenProvided: function(req, res, next){
    	// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		if (token) {
			// verifies secret and checks exp
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.' });    
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;    
					next();
				}
			});
		} else {
			if(req.originalUrl == "/api/session/login"){
				console.log("no token but going to login")
				next();
			} else {
			    // if there is no token
			    // return an error
			    return res.status(403).send({ 
			        success: false, 
			        message: 'No token provided.' 
			    });
			}
		}
	},

	checkIfSessionIsValid: function(req, res, next) { 
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {
			let isValidSessionPromise = nimbus.sessions.verifySession(token);

			isValidSessionPromise.then(function(isValidSession){
				if ( isValidSession == true ) {
					next();
				} else {
					return res.status(403).send({ 
				        success: false, 
				        message: 'Session invalid. Re-authenticate.' 
				    });
				}
			});
		} else {
			next()
		}
	}


};

module.exports = middleware