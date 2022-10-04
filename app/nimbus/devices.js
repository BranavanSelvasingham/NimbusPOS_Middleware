var app = require('../app');
var _ = require('underscore');

var devices = {
	collection: app.settings.Collections["Devices"],

	createNewDevice: function(deviceId, businessId, session){
		var Devices = app.settings.Collections["Devices"];

		Devices.find({_id: businessId}).exec(function(error, allDevices){
			if (error) {
				console.log(error);
			} else {
				console.log("looking for device numbers");
				if (allDevices.length > 0) {
					let sortedDevices = _.sortBy(allDevices, "deviceNumber")
					let lastDevice = sortedDevices[sortedDevices.length - 1]
					let deviceNumber = lastDevice.deviceNumber + 1
					console.log("not first device")
					devices.insertNewDevice(deviceId, businessId, session, deviceNumber)
				} else {
					console.log("first device")
					let deviceNumber = 1
					devices.insertNewDevice(deviceId, businessId, session, deviceNumber)
				}
			}
		});
	},

	insertNewDevice: function(deviceId, businessId, session, deviceNumber){
		console.log("inserting new device");
		let newDevice = {
			_id: deviceId,
			businessId: businessId,
			sessionId: session._id,
			createdAt: new Date(),
			deviceNumber: deviceNumber
		};

		let newDocument = new devices.collection(newDevice);
		newDocument.save();
	},

	updateDeviceSession: function(device, session){
		devices.collection.findOne({_id: device._id}).exec(function(error, device){
			if (device){
				if (session) {
					device.sessionId = session._id;	
				} else {
					device.sessionId = null;
				}
				
				device.save();
			}
		});
	},

	getSessionDevice: async function(session){
		var device;

		await devices.collection.findOne({sessionId: session._id}).then(function(sessionDevice){
			if (sessionDevice) {
				device = sessionDevice
			}
		});

		return device
	}

};


module.exports = devices