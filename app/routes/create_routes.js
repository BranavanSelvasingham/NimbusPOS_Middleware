var express = require('express');
var jwt    = require('jsonwebtoken');
var _ = require('underscore');
var nimbus = require('../nimbus/nimbus');

// var userSchema = require('.././models/schemas/user');
// var productSchema = require('.././models/schemas/product');
// var productCategorySchema = require('.././models/schemas/productCategory');
// var productAddonSchema = require('.././models/schemas/productAddon');
// var tableSchema = require('.././models/schemas/table');
// var loyaltyCardSchema = require('.././models/schemas/loyaltyCard');
// var loyaltyProgramSchema = require('.././models/schemas/loyaltyProgram');
// var customerSchema = require('.././models/schemas/customer');
// var employeeSchema = require('.././models/schemas/employee');
// var noteSchema = require('.././models/schemas/note');
// var expenseSchema = require('.././models/schemas/expense');
// var invoiceSchema = require('.././models/schemas/invoice');
// var locationSchema = require('.././models/schemas/location');
// var businessSchema = require('.././models/schemas/business');
// var businessUserSchema = require('.././models/schemas/businessUser');
// var orderSchema = require('.././models/schemas/order');

module.exports = function(app) {
   	// get an instance of the router for api routes
	var createRoutes = express.Router();

	// apply the routes to our application with the prefix /api
	app.use('/api', createRoutes);  

	createRoutes.put('/createNewDocument', function(req, res){
		nimbus.baseCRUD.createNewDocument(app, req, res);
	});

	createRoutes.put('/upsertOneDocument', function(req, res){
		nimbus.baseCRUD.upsertOneDocument(app, req, res);
	});

};