var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;


var employeeHoursSchema = new Schema({
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
    employeeId: {
        type: String
    },
    date: {
        type: Date,        
    },
    actualHours: {
        type: Number,                
    },
    actualClockIn: {
        type: Date,        
    },
    actualClockOut: {
        type: Date,        
    },
    plannedHours: {
        type: Number,                
    },
    plannedClockIn: {
        type: Date,        
    },
    plannedClockOut: {
        type: Date,        
    }
});

module.exports = employeeHoursSchema