var _ = require('underscore');

var baseCRUD = {
	queryCollection: function(app, req, res){
		var businessId = req.decoded.businessId;
			
		var collectionName = req.body.collectionName;
		var findParams = req.body.findParams || {};
		var limit = req.body.limit || null;
		var sortParams = req.body.sortParams || {};
		var selectParams = req.body.selectParams || {};

		if(collectionName == "Businesses"){
			findParams._id = businessId;
		} else if (collectionName == "BusinessUsers"){
			findParams.userId = req.decoded.userId;
		} else {
			findParams.businessId = businessId;
		}

		if(limit == null && collectionName == "Orders"){limit = 10;}

		app.settings.Collections[collectionName]
					.find(findParams)
					.limit(limit)
					.sort(sortParams)
					.select(selectParams)
					.exec(function(err, results) {
						console.log(err);
						res.json(results);
					});
	},

	createNewDocument: function(app, req, res){
		console.log(req.body);

		var collectionName = req.body.collectionName;
		var newDocument = new app.settings.Collections[collectionName](req.body.newDocument);
		var businessId = req.decoded.businessId;

		console.log(collectionName);

		if (!!newDocument.businessId){
			if(newDocument.businessId != businessId){
				res.json({message:"business ID invalid", success: false});
				return;
			}
		} else {
			if(collectionName == "Businesses" || collectionName == "BusinessUsers" || collectionName == "Users"){
				// these collections don't have a .businessId field
			} else {
				newDocument.businessId = businessId;
			}
		}

		newDocument.save(function(err, doc){
			if(err) {
				res.json({message:"Error saving new document", success: false});
				throw err;
			} else {
				res.json({success: true, message: "New document created", _id: doc._id});
			}
		});
	},

	upsertOneDocument: function(app, req, res){
		var collectionName = req.body.collectionName;
		var newDocument = new app.settings.Collections[collectionName](req.body.newDocument);
		var businessId = req.decoded.businessId;
		var findParams = {_id: newDocument._id};

		app.settings.Collections[collectionName]
					.findOne(findParams,
						function(err, doc) {
							if (err) {
								console.log(err);
							} else {
								if (doc) {
									baseCRUD.updateOneDocument(app, req, res);
								} else {
									baseCRUD.createNewDocument(app, req, res);
								}
							}
						}
					);

	},

	updateOneDocument: function(app, req, res){
		var businessId = req.decoded.businessId;
			
		var collectionName = req.body.collectionName;
		var findParams = req.body.findParams || {};
		var updateParams = req.body.updateParams || {};

		if (updateParams._id) {
			delete updateParams._id;
		}

		if(collectionName == "Businesses"){
			findParams._id = businessId;
		} else if (collectionName == "BusinessUsers"){
			findParams.userId = req.decoded.userId;
		} else {
			findParams.businessId = businessId;
		}

		app.settings.Collections[collectionName]
					.findOne(findParams,
						function(err, doc) {
							_.extend(doc, updateParams);
							doc.save();
							res.status(200).json({status:"OK", message:"Document updated"})
						}
					);
	},

	deleteOneDocument: function(app, req, res){
		var businessId = req.decoded.businessId;	
		var collectionName = req.body.collectionName;
		var documentId = req.body.documentId || null;

		if(!!documentId){
			app.settings.Collections[collectionName]
						.remove({_id: documentId},
							function(err, doc) {
								res.status(200).json({status:"OK", message:"Document deleted"})
							}
						);
		} else {
			res.status(400).json({message: "Need document Id for removing"});
		}
	}
}

module.exports = baseCRUD