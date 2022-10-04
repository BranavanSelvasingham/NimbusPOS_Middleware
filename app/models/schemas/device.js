var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;


var deviceSchema = new Schema({
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
        type: String
    },
    sessionId: {
        type: String
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date
    },
    deviceNumber: {
        type: Number
    }
});

module.exports = deviceSchema
