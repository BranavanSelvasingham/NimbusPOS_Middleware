var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;


var objectChangeLog = new Schema({
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
    collectionName: {
        type: String
    },
    objectId: {
        type: String
    },
    objectChangeType: {
        type: String
    },
    updateTask:{
        type: Object
    },
    updatedOn: {
        type: Date,
        required: true,
        default: function(){
            return new Date();
        }
    }

});

module.exports = objectChangeLog