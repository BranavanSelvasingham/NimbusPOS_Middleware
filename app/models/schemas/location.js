var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var address = new Schema({
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pin: {
        type: String
    },
    country: {
        type: String
    }
});

var printer = new Schema({
    connection: {
        type: String
    },
    use: {
        type: String,
    },
    address: {
        type: String
    },
    name: {
        type: String
    },
    disabled: {
        type: Boolean,
    }
});

var floorTile = new Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    }
});

var cornerCoordinates = new Schema({
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    z: {
        type: Number
    }
});

var floorSections = new Schema({
    name: {
        type: String,
    },
    floorTile: {
        type: floorTile,
    },
    vertices:{
        type: [cornerCoordinates],
    }
});


var location = new Schema({
    _id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
    name: {
        type: String
    },
    businessId: {
        type: String
    },
    address: {
        type: address
    },
    receiptMessage: {
        type: String
    },
    printers: {
        type: [printer]
    },
    floorLayoutSections:{
        type: [floorSections]
    }
});

module.exports = location;

