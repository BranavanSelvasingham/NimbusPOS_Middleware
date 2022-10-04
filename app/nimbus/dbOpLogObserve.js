var MongoOplog = require('mongo-oplog')
var _ = require('underscore');
var app	= require('../app');

var collectionsList = [
						{ 
							name: "Products",
							nsId: "nimbusdb.products"
						},
						{ 
							name: "ProductCategories",
							nsId: "nimbusdb.productcategories"
						},
						{ 
							name: "ProductAddons",
							nsId: "nimbusdb.productaddons"
						},
						{ 
							name: "Orders",
							nsId: "nimbusdb.orders"
						},
						{ 
							name: "Tables",
							nsId: "nimbusdb.tables"
						},
						{ 
							name: "Customers",
							nsId: "nimbusdb.customers"
						},
						{ 
							name: "LoyaltyPrograms",
							nsId: "nimbusdb.loyalty-programs"
						},
						{ 
							name: "LoyaltyCards",
							nsId: "nimbusdb.loyalty-cards"
						},
						{ 
							name: "Employees",
							nsId: "nimbusdb.employees"
						},
						{ 
							name: "EmployeeHours",
							nsId: "nimbusdb.employeeHours"
						},
						{ 
							name: "Notes",
							nsId: "nimbusdb.notes"
						},
						{ 
							name: "Expenses",
							nsId: "nimbusdb.expenses"
						},
						{ 
							name: "Locations",
							nsId: "nimbusdb.locations"
						},
						{ 
							name: "Businesses",
							nsId: "nimbusdb.businesses"
						},
						{ 
							name: "Devices",
							nsId: "nimbusdb.devices"
						},
						// { 
						// 	name: "Sessions",
						// 	nsId: "nimbusdb.sessions"
						// }
					];


var allOpLogObservers = {};

_.each(collectionsList, function(collection){
	var oplog = MongoOplog(app.settings.opDatabaseURI, {ns: collection.nsId});
 
	oplog.tail();
	 
	// oplog.on('op', data => {
	//   console.log(data);
	// });
	 
	oplog.on('insert', doc => {
		console.log("insert");
		console.log(doc);

		var newChangeLog = {
			businessId: doc.o.businessId,
			collectionName: collection.name,
			objectId: doc.o._id,
			objectChangeType: doc.op
		};

		console.log(newChangeLog);

		app.settings.Collections["ObjectChangeLog"].findOne(newChangeLog).exec(function(err, existingDoc){
					if (err) {

					} else {
						if (existingDoc) {
							existingDoc.updatedOn = new Date();
							existingDoc.save();
						} else {
							newChangeLog.updatedOn = new Date();
							var changeLog = new app.settings.Collections["ObjectChangeLog"](newChangeLog);
							changeLog.save();
						}
					}
				});

	});
	 
	oplog.on('update', doc => {
	  	console.log("update");
		console.log(doc);

		let objectId = doc.o2._id;

		app.settings.Collections[collection.name].findOne({_id: objectId}).exec(function(err, updatedDoc){
			if (err) {

			} else {
				var newChangeLog = {
					businessId: updatedDoc.businessId,
					collectionName: collection.name,
					objectId: doc.o2._id,
					objectChangeType: doc.op
				};

				console.log(newChangeLog);

				app.settings.Collections["ObjectChangeLog"].findOne(newChangeLog).exec(function(err, existingDoc){
					if (err) {

					} else {
						if (existingDoc) {
							existingDoc.updatedOn = new Date();
							existingDoc.save();
						} else {
							newChangeLog.updatedOn = new Date();
							var changeLog = new app.settings.Collections["ObjectChangeLog"](newChangeLog);
							changeLog.save();
						}
					}
				});
			}
		});

		
	});
	 
	oplog.on('delete', doc => {
	  	console.log("delete");
		console.log(doc);

		var newChangeLog = {
			collectionName: collection.name,
			objectId: doc.o._id,
			objectChangeType: doc.op
		};

		app.settings.Collections["ObjectChangeLog"].findOne(newChangeLog).exec(function(err, existingDoc){
					if (err) {

					} else {
						if (existingDoc) {
							//can't delete something twice
						} else {
							newChangeLog.updatedOn = new Date();
							var changeLog = new app.settings.Collections["ObjectChangeLog"](newChangeLog);
							changeLog.save();
						}
					}
				});
	});
	 
	oplog.on('error', error => {
	  // console.log(error);
	});

	// oplog.on('end', () => {
	//   console.log('Stream ended');
	// });
	 
	// oplog.stop(() => {
	//   console.log('server stopped');
	// });

	allOpLogObservers[collection.nsId] = oplog;

});