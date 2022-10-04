var express = require('express');
var app	= require('../app');
var nimbus = require('../nimbus/nimbus');

module.exports = function(app) {

	var sessionRoutes = express.Router();

	app.use("/api/session", sessionRoutes);

	sessionRoutes.get('/', function(req, res) {
        res.json({ message: 'Nimbus POS Inc. Device APIs' });
    });

	sessionRoutes.post('/login', function(req, res){
		// find the user
	  	app.settings.Collections.Users.findOne({
	    	username: req.body.username
	  	}, function(err, user) {
		    if (err) throw err;

		    if (!user) {
		      res.json({ success: false, message: 'Authentication failed. User not found.' });
		    } else if (user) {
			    // check if password matches
			    if (user.isValidPassword(req.body.password)) {
			        // if user is found and password is right
			        // create a token 

				    let token = nimbus.sessions.getAuthenticatedTokenForUser(user);

			        let isValidSessionPromise = nimbus.sessions.verifySession(token);

			        isValidSessionPromise.then(function(isValidSession){
				        if (isValidSession == true) {
				        	// do nothing
				        	console.log("valid session exists");
				        } else {
				        	//insert new session
				        	console.log("no valid session found");
				        	nimbus.sessions.createNewSession(token);
				        }
				    });
				    // return the information including token as JSON
			        res.json({
						success: true,
						message: 'Authenticated.',
						token: token
			        });
			    } else {
			    	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			    }   
		    }
	  	});
	});

	sessionRoutes.post('/isSessionActive', function(req, res) {
		res.json({
			success: true,
			message: 'Session is active.'
		});	

	});

	sessionRoutes.post('/logout', function(req, res) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		nimbus.sessions.deleteAuthenticatedSession(token);

		res.json({
			success: true,
			message: 'Session logged out.'
		});	

	});

	sessionRoutes.post('/refreshSession', function(req, res) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		let refreshSessionPromise = nimbus.sessions.refreshToken(token);

		refreshSessionPromise.then(function(newToken){
			res.json({
				success: true,
				message: 'Refreshed. Keep new token safe.',
				token: newToken
	        });
		});
	});
};
