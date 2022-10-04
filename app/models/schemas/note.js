var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var noteVisibility = new Schema({
    businessWide: {
        type: Boolean,
        default: true
    },
    locationSpecific: {
        type: Boolean,
        default: false
    },
    userSpecific: {
        type: Boolean,
        default: false
    },
    customerSpecific: {
        type: Boolean,
        default: false
    },
    orderSpecific: {
        type: Boolean,
        default: false
    }
});

var noteSchema = new Schema({
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
    userId: {
        type: String        
    },
    customerId: {
        type: String        
    },
    orderId: {
        type: String        
    },
    title: {
        type: String        
    },
    description: {
        type: String        
    },
    visibleTo: {
        type: noteVisibility
    },
    createdOn: {
        type: Date
    },
    createdBy: {
        type: String
    }
});

module.exports = noteSchema;