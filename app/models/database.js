var mongoose = require('mongoose');
var app	= require('../app');
var userSchema = require('./schemas/user');
var productSchema = require('./schemas/product');
var productCategorySchema = require('./schemas/productCategory');
var productAddonSchema = require('./schemas/productAddon');
var tableSchema = require('./schemas/table');
var loyaltyCardSchema = require('./schemas/loyaltyCard');
var loyaltyProgramSchema = require('./schemas/loyaltyProgram');
var customerSchema = require('./schemas/customer');
var employeeSchema = require('./schemas/employee');
var employeeHoursSchema = require('./schemas/employeeHours');
var noteSchema = require('./schemas/note');
var expenseSchema = require('./schemas/expense');
var invoiceSchema = require('./schemas/invoice');
var locationSchema = require('./schemas/location');
var businessSchema = require('./schemas/business');
var businessUserSchema = require('./schemas/businessUser');
var orderSchema = require('./schemas/order');
var deviceSchema = require('./schemas/device');
var sessionSchema = require('./schemas/session');
var objectChangeLogSchema = require('./schemas/objectChangeLog');

// mongoose.set('debug', true);
mongoose.connect(app.settings.databaseURI, { useMongoClient: true }); // connect to database

app.set("mongooseInstant", mongoose);

app.set("Collections", {
	Users: mongoose.model("users", userSchema),
	Products: mongoose.model("products", productSchema),
	ProductCategories: mongoose.model("productcategories", productCategorySchema),
	ProductAddons: mongoose.model("productaddons", productAddonSchema),
	Orders: mongoose.model("orders", orderSchema),
	Tables: mongoose.model("tables", tableSchema),
	Customers: mongoose.model("customers", customerSchema),
	LoyaltyPrograms: mongoose.model("loyalty-programs", loyaltyProgramSchema),
	LoyaltyCards: mongoose.model("loyalty-cards", loyaltyCardSchema),
	Employees: mongoose.model("employees", employeeSchema),
	EmployeeHours: mongoose.model("employeehours", employeeHoursSchema),
	Notes: mongoose.model("notes", noteSchema),
	Expenses: mongoose.model("expenses", expenseSchema),
	Invoices: mongoose.model("invoices", invoiceSchema),
	Locations: mongoose.model("locations", locationSchema),
	Businesses: mongoose.model("businesses", businessSchema),
	BusinessUsers: mongoose.model("business-users", businessUserSchema),
	Devices: mongoose.model("devices", deviceSchema),
	Sessions: mongoose.model("sessions", sessionSchema),
	ObjectChangeLog: mongoose.model("objectchangelogs", objectChangeLogSchema)
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});