var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;


var sessionSchema = new Schema({
    _id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
    token: {
        type: String
    },
    businessId: {
        type: String
    },
    userId: {
        type: String
    },
    lastActive: {
        type: Date
    }
});

module.exports = sessionSchema