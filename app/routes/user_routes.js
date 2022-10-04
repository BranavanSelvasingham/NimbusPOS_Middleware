var express = require('express');
var app			= require('../app');

module.exports = function(app) {
	// get an instance of the router for api routes
	var userRoutes = express.Router();

 //    // apply the routes to our application with the prefix /api
	// app.use('/api', userRoutes);   

	// // route to return all users (GET http://localhost:8080/api/users)
	// userRoutes.get('/users', function(req, res) {
	// 	app.settings.Collections.Users.find({}, function(err, users) {
	// 		res.json(users);
	// 	});
	// });   

	// // route to authenticate a user (POST http://localhost:8080/api/authenticate)
	// userRoutes.post('/authenticate', function(req, res) {
	//   	// find the user
	//   	User.findOne({
	//     	name: req.body.name
	//   	}, function(err, user) {
	// 	    if (err) throw err;

	// 	    if (!user) {
	// 	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	// 	    } else if (user) {
	// 		    // check if password matches
	// 		    if (user.validPassword(req.body.password)) {
	// 		        // if user is found and password is right
	// 		        // create a token with only our given payload
	// 			    // we don't want to pass in the entire user since that has the password
	// 			    const payload = {
	// 			    	admin: false 
	// 			    };
			        
	// 		        var token = jwt.sign(payload, app.get('superSecret'));

	// 		        // return the information including token as JSON
	// 		        res.json({
	// 		          success: true,
	// 		          message: 'Enjoy your token!',
	// 		          token: token
	// 		        });
	// 		    } else {
	// 		    	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	// 		    }   
	// 	    }
	//   	});
	// });


	// // route middleware to verify a token
	// userRoutes.use(function(req, res, next) {
	// 	next();
	// 	// // check header or url parameters or post parameters for token
	// 	// var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// 	// // decode token
	// 	// if (token) {

	// 	// 	// verifies secret and checks exp
	// 	// 	jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
	// 	// 	  if (err) {
	// 	// 	    return res.json({ success: false, message: 'Failed to authenticate token.' });    
	// 	// 	  } else {
	// 	// 	    // if everything is good, save to request for use in other routes
	// 	// 	    req.decoded = decoded;    
	// 	// 	    next();
	// 	// 	  }
	// 	// 	});

	// 	// } else {

	// 	//     // if there is no token
	// 	//     // return an error
	// 	//     return res.status(403).send({ 
	// 	//         success: false, 
	// 	//         message: 'No token provided.' 
	// 	//     });

	// 	// }
	// });

};