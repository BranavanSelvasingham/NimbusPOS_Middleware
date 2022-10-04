// // =======================
// // get the packages we need 
// // =======================

// var bodyParser  = require('body-parser');
// var morgan      = require('morgan');
// var mongoose    = require('mongoose');
// var jwt    		= require('jsonwebtoken'); // used to create, sign, and verify tokens
// var config 		= require('./config/config'); // get our config file
// var app			= require('./app/app');
// var _ 			= require('underscore');

// // =======================
// // configuration =========
// // =======================
// var port = process.env.PORT || 8070; 

// app.set('databaseURI', config.database);

// // =======================
// // initialize database and models 
// //    add all collections to app.settings.Collections
// // =======================
// require('./app/models/database');

// console.log('Magic happens at http://localhost:' + port);

// // app.settings.Collections["Employees"].find().exec(function(err, results) {
// // 						_.each(results, function(employee){
// // 							migrateHoursOutOfEmployee(employee)
// // 						})
// // 					});
// app.settings.Collections["EmployeeHours"].count().exec(function(err, results) {
// 						console.log("count is ", results);
// 					})

// function migrateHoursOutOfEmployee(employee){
// 	console.log(employee.name)
// 	let oldHourEntries = employee.actualHours.length
// 	console.log("has hours: ", oldHourEntries)

// 	_.each(employee.actualHours, function(hourEntry){
// 		let migratedHourEntry = {
// 			businessId: employee.businessId,
// 			employeeId: employee._id,
// 			date: hourEntry.date,
// 			actualHours: hourEntry.hours,
// 			actualClockIn: hourEntry.clockIn,
// 			actualClockOut: hourEntry.clockOut
// 		};

// 		let collectionName = "EmployeeHours";
// 		let newDocument = new app.settings.Collections[collectionName](migratedHourEntry);

// 		newDocument.save(function(err, doc){
// 			//
// 		});
// 	});

// 	app.settings.Collections["EmployeeHours"].count().exec(function(err, results) {
// 						console.log("new employee hours count is ", results);
// 					})
// }