var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;


var employeeHours = new Schema({
    date: {
        type: Date,        
    },
    hours: {
        type: Number,                
    },
    clockIn: {
        type: Date,        
    },
    clockOut: {
        type: Date,        
    },
    pay: {
        type: Number,                
    }
});

var employeeSchema = new Schema({
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
    phone: {
        type: Number,        
    },
    pin:{
        type: String,        
        default: '0000'
    },
    email: {
        type: String,
        regEx: mongoose.SchemaTypes.Email        
    },
    plannedHours: {
        type: [employeeHours],        
    },

    actualHours:{
        type: [employeeHours],        
    },
    status: {
        type: String,        
    },
    rate: {
        type: Number, //hourly rate                
    }
});

module.exports = employeeSchema;