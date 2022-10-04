var express = require('express');
var jwt    = require('jsonwebtoken');
var _ = require('underscore');
var middleware = require('./middleware');
var nimbus = require('../nimbus/nimbus');

module.exports = function(app) {
   	app.get('/', function(req, res) {
        res.json({ message: 'Welcome to Nimbus POS Inc.!' });
    });

  	app.use(
  		middleware.checkIfTokenProvided,
  		middleware.checkIfSessionIsValid
  	);

    app.post('/login', function(req, res) {
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

				    let token = nimbus.sessions.getAuthenticatedToken(user);

			        let isValidSessionPromise = nimbus.sessions.verifySession(token);

			        isValidSessionPromise.then(function(isValidSession){
				        if (isValidSession == true) {
				        	// do nothing
				        	console.log("valid session exists");
				        } else {
				        	//insert new session
				        	console.log("no valid session found");
				        	nimbus.sessions.createNewSession(token, payload.businessId, payload.userId)
				        }

					    // return the information including token as JSON
				        res.json({
							success: true,
							message: 'Authenticated. Keep token safe.',
							token: token
				        });
				    });
				  //   // return the information including token as JSON
			   //      res.json({
						// success: true,
						// message: 'Authenticated. Keep token safe.',
						// token: token
			   //      });
			    } else {
			    	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			    }   
		    }
	  	});
    });

	app.get('/api', function(req, res) {
        res.json({ message: 'Nimbus POS Inc. APIs' });
    });

	// get an instance of the router for api routes
	var apiRoutes = express.Router();

	// apply the routes to our application with the prefix /api
	app.use('/api', apiRoutes);     

	apiRoutes.get('/listCollectionNames', function(req, res){
		res.json(_.allKeys(app.settings.Collections));
	});

	// route to return all collections
	apiRoutes.post('/queryCollection', function(req, res) {
		nimbus.baseCRUD.queryCollection(app, req, res);
	});


	apiRoutes.post('/updateOneDocument', function(req, res){
		nimbus.baseCRUD.updateOneDocument(app, req, res);
	});

	apiRoutes.delete('/deleteOneDocument', function(req, res){
		nimbus.baseCRUD.deleteOneDocument(app, req, res);
	});

};