var express = require('express');
var app		= require('../app');

module.exports = function(app) {
	// // get an instance of the router for api routes
	// var productRoutes = express.Router();

	// // apply the routes to our application with the prefix /api
	// app.use('/api', productRoutes);     

	// // route to return all users (GET http://localhost:8080/api/users)
	// productRoutes.get('/products', function(req, res) {
	// 	var businessId = req.decoded.businessId;
		
	// 	app.settings.Collections.Products.find({businessId: businessId}, function(err, products) {
	// 		res.json(products);
	// 	});
	// });   
};