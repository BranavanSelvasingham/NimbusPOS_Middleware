var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;


var printerSchema = new Schema({
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
    serialNumber: {
        type: String
    },
    manufacturerName: {
        type: String
    },
    model: {
        type: String
    },
    use: {
        type: String
    },
    connectionType: {
        type: String
    },
    connectionId: {
        type: String
    }

});

module.exports = printerSchema
