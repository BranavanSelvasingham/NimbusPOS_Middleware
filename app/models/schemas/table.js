var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
	Schema = mongoose.Schema;

var coordinates = new Schema({
    x: {
        type: Number,        
    },
    y: {
        type: Number,        
    },
    z: {
        type: Number,        
    }
});

var table = new Schema({
	_id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
    businessId: {
        type: String
    },
    locationId: {
        type: String,
    },
    status: {
        type: String,        
    },
    waiter: {
        type: String,        
    },
    tableLabel: {
        type: String,        
    },
    defaultSeats: {
        type: Number,        
    },
    seats: {
        type: Number,        
    },
    orders: {
        type: [String], //array of order ids        
    },
    shape: {
        type: String,        
    },
    position: {
        type: coordinates,        
    }
});

// table.methods.comparePassword = function(password){
// 	return bcrypt.compareSync(password, this.hash_password);
// };

module.exports = table;