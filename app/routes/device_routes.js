var express = require('express');
var app	= require('../app');
var nimbus = require('../nimbus/nimbus');
var _ = require('underscore');

module.exports = function(app) {

	var deviceRoutes = express.Router();

	app.use("/api/device", deviceRoutes);

	deviceRoutes.get('/', function(req, res) {
        res.json({ message: 'Nimbus POS Inc. Device APIs' });
    });

    deviceRoutes.post('/getDeviceNumber', function(req, res){
		var token = req.body.token;
		var businessId = req.decoded.businessId;
		var deviceId = req.body.deviceId;

		var Devices = app.settings.Collections["Devices"];

		Devices.findOne({_id: deviceId}).exec(function(error, device){
			if (error) {
				console.log(error);
				res.json({success: false, message:"Error occured", status: 400});
			} else {
				if (device) {
					let results = [{deviceNumber: device.deviceNumber}]
					res.json({success: true, message: "Device prefix", status: 200, results: results})
				} else {
					res.json({success: false, message:"Internal error occured", status: 400});
				}
			}
		});
	});

	deviceRoutes.put('/registerDevice', function(req, res){
		var token = req.body.token;
		var deviceId = req.body.deviceId;
		var businessId = req.decoded.businessId;
		var collectionName = "Devices";
		var Devices = app.settings.Collections[collectionName];

		var currentSessionPromise = nimbus.sessions.getCurrentSession(token);
		var session;

		currentSessionPromise.then(function(result){
			session = result;

			Devices.findOne({_id: deviceId}).exec(function(error, device){
				if (error) {
					console.log(error);
					res.json({success: false, message:"Error occured", status: 400});
				} else {
					if (device) {
						if (device.sessionId != session._id){
							nimbus.devices.updateDeviceSession(device, session);
							console.log("Existing device updated with new session id");
							res.json({success: true, message: "Updated device with new session", status: 200});
						} else {
							console.log("Existing device with matching sesssion and _id");
							res.json({success: true, message:"Device check done.", status: 200});
						}
					} else {
						console.log("New device. Proceeding to register.")
						nimbus.devices.createNewDevice(deviceId, businessId, session);
						res.json({success: true, message: "New device registered", status: 200});
					}
				}
			});
		});
	});

	deviceRoutes.post('/updateDeviceLocation', function(req, res) {
		var deviceId = req.body.deviceId;
		var businessId = req.decoded.businessId;
		var locationId = req.body.locationId;

		var collectionName = "Devices";
		var Devices = app.settings.Collections[collectionName];

		Devices.findOne({_id: deviceId}).exec(function(error, device){
			if (error) {
				console.log(error);
				res.json({success: false, message:"Error occured", status: 400});
			} else {
				if (device) {
					device.locationId = locationId;
					device.save();
					res.json({success: true, message: "Updated Device Location", status: 200});
				} else {
					console.log("Could not find device");
					res.json({success: false, message:"Device not found", status: 200});
				}
			}
		});
	});

};
