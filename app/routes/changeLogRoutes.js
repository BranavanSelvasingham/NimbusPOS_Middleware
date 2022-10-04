var express = require('express');
var app	= require('../app');
var nimbus = require('../nimbus/nimbus');

module.exports = function(app){

	var changeLogRoutes = express.Router();

	app.use("/api/changeLog", changeLogRoutes);

	changeLogRoutes.get('/', function(req, res) {
        res.json({ message: 'Nimbus POS Inc. Change log APIs.' });
    });

	changeLogRoutes.post('/getUpdates', function(req, res){
		var businessId = req.decoded.businessId;
		var lastSync = new Date(req.body.lastSync);
		var collectionName = "ObjectChangeLog";
		var ChangeLogs = app.settings.Collections[collectionName];

		console.log("last sync date: ", lastSync);
		if (!nimbus.tools.dateValid(lastSync)) {
			return res.json({
				success: false,
				message: "Invalid date"
			})
		}
		var findParams = {objectChangeType: "u", businessId: businessId, updatedOn: {$gt: lastSync}};

		var findCallback = function(err, results) {
			if (err) {
				console.log(err);
				res.json({
					success: false,
					message: "Error returning update logs",
					results: []
				});
			} else {
				console.log(results);
				res.json({
					success: true,
					message: "Returning update logs",
					results: results
				});
			}
		}

		ChangeLogs.find(findParams).exec(findCallback);
	});

	changeLogRoutes.post('/getInserts', function(req, res){
		var businessId = req.decoded.businessId;
		var lastSync = new Date(req.body.lastSync);
		var collectionName = "ObjectChangeLog";
		var ChangeLogs = app.settings.Collections[collectionName];

		console.log("last sync date: ", lastSync);
		if (!nimbus.tools.dateValid(lastSync)) {
			return res.json({
				success: false,
				message: "Invalid date"
			})
		}

		var findParams = {objectChangeType: "i", businessId: businessId, updatedOn: {$gt: lastSync}};

		var findCallback = function(err, results) {
			if (err) {
				console.log(err);
				res.json({
					success: false,
					message: "Error returning insert logs",
					results: []
				});
			} else {
				res.json({
					success: true,
					message: "Returning insert logs",
					results: results
				});
			}
		}

		ChangeLogs.find(findParams).exec(findCallback);
	});

	changeLogRoutes.post('/getDeletes', function(req, res){
		// var businessId = req.decoded.businessId;
		var lastSync = new Date(req.body.lastSync);
		var collectionName = "ObjectChangeLog";
		var ChangeLogs = app.settings.Collections[collectionName];

		console.log("last sync date: ", lastSync);
		if (!nimbus.tools.dateValid(lastSync)) {
			return res.json({
				success: false,
				message: "Invalid date"
			})
		}
		var findParams = {objectChangeType: "d", updatedOn: {$gt: lastSync}};

		var findCallback = function(err, results) {
			if (err) {
				console.log(err);
				res.json({
					success: false,
					message: "Error returning delete logs",
					results: []
				});
			} else {
				res.json({
					success: true,
					message: "Returning delete logs",
					results: results
				});
			}
		}

		ChangeLogs.find(findParams).exec(findCallback);
	});

};
