const generalRoutes = require('./general_routes');
const createRoutes = require('./create_routes');
const userRoutes = require('./user_routes');
const productRoutes = require('./product_routes');
const deviceRoutes = require('./device_routes');
const sessionRoutes = require('./session_routes');
const changeLogRoutes = require('./changeLogRoutes');

module.exports = function(app) {
	generalRoutes(app);
	createRoutes(app);
	deviceRoutes(app);
	sessionRoutes(app);
	changeLogRoutes(app);
	// userRoutes(app);
	// productRoutes(app);
};