var app = require('../app')
var Promise = require('es6-promise').Promise
var devices = require('./devices')
var jwt    = require('jsonwebtoken')

var sessions = {
	collection: app.settings.Collections["Sessions"],

	getAuthenticatedTokenForUser: function(user){
		const payload = {
	    	userId: user._id,
	    	businessUserId: user.profile.businessUserId,
	    	businessId: user.profile.businessId
	    };

        return sessions.getAuthenticatedTokenForPayload(payload);
	},

	getAuthenticatedTokenForPayload: function(payload){
        var token = jwt.sign(payload, app.get('superSecret'));

        return token;
	},

	deleteAuthenticatedSession: function(token){
		let currentSessionPromise = sessions.getCurrentSession(token);

		currentSessionPromise.then(function(session){
			if (session){
				sessions.collection.remove({_id: session._id}).exec();

				let sessionDevicePromise = devices.getSessionDevice(session);

				sessionDevicePromise.then(function(sessionDevice){
					if (sessionDevice) {
						devices.updateDeviceSession(sessionDevice, null);
					}
				});
			}
		});
	},

	refreshToken: async function(token){
		//must have active session in order to refresh

		let payload = sessions.decodeAuthenticToken(token);
		
		let currentSessionPromise = sessions.getCurrentSession(token);

		var newToken;

		await currentSessionPromise.then(function(session){
			if (session){
				sessions.deleteAuthenticatedSession(token);

				newToken = sessions.getAuthenticatedTokenForPayload(payload);

				let newSession = sessions.createNewSession(newToken, payload.businessId, payload.userId);

				let sessionDevicePromise = devices.getSessionDevice(session);

				sessionDevicePromise.then(function(sessionDevice){
					if (sessionDevice) {
						devices.updateDeviceSession(sessionDevice, newSession);
					}
				});
			}
		});

		return newToken;
	},

	decodeAuthenticToken: function(token){
		return jwt.decode(token, app.get("superSecret"));
	},

	verifySession: async function(token){
		let findParams = {token: token};
		let sessionCheck = sessions.collection.findOne(findParams).exec();
		var valid;
		await sessionCheck.then(function(activeSession) {
					if (activeSession) {
						valid = true;
						sessions.updateSessionTimeStamp(token);
					} else {
						valid = false;
					}
				});

		return valid;
	},

	updateSessionTimeStamp: function(token){
		let collectionName = "Sessions";
		let findParams = {token: token};
		
		app.settings.Collections[collectionName].findOne(findParams, function(error, session) {
					if (error) {
						console.log(error);
					} else {
						if (session) {
							session.lastActive = new Date();
							session.save();
						} else {
							console.log("session not found");
						}
					}
				});

	},

	createNewSession: function(token){
		let payload = sessions.decodeAuthenticToken(token);

		let newSession = {
			token: token,
			businessId: payload.businessId,
			userId: payload.userId,
			lastActive: new Date()
		};

		var newDocument = new sessions.collection(newSession);

		newDocument.save(function(err, doc){
			//new session created
			console.log("session created")
		});

		return newDocument;
	},

	getCurrentSession: async function(token){
		let collectionName = "Sessions";
		let findParams = {token: token};
		let sessionCheck = app.settings.Collections[collectionName].findOne(findParams).exec();
		var Session;
		await sessionCheck.then(function(session) {
					Session = session;
				});

		return Session;
	}

};


module.exports = sessions