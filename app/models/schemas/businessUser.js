var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var businessUserPersona = new Schema({
    locationId: {
        type: String
    },
    role: {
        type: String,// role name
        // allowedValues: _.values(Maestro.Business.Roles),
    }
});

var businessDetail = new Schema({
    businessId: {
        type: String
    },
    businessName: {
        type: String
    }
});

var businessUser = new Schema({
    _id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
    userId: {
        type: String
    },
    role: {
        type: String, // role name
        // allowedValues: _.values(Maestro.Business.Roles),
    },
    status: {
        type: String,
        // default: Maestro.User.Status.ACTIVE.key,
        // allowedValues: Maestro.User.Status.keys()
    },
    persona: {
        type: [businessUserPersona],
        default: null
    },
    businessesList: {
        type: [businessDetail]
    }
});

module.exports = businessUser;