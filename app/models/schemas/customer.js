var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var customerSchema = new Schema({
    _id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        regEx: mongoose.SchemaTypes.Email
    },
    phone: {
        type: Number
    },
    businessId: {
        type: String
    },
    notes: {
        type: String,
    }
});

module.exports = customerSchema;

