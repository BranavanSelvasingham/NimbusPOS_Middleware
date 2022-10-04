var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var expenseTimeComponents = new Schema({
    year: {
        type: Number,
    },
    month: {
        type: Number,
    },
    day: {
        type: Number,
    },
    hour: {
        type: Number,
    }
});


var expense = new Schema({
    _id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
    vendor: {
        type : String
    },
    businessId: {
        type: String
    },
    details: {
        type: String,
    },
    amount: {
        type: Number,        
    },
    tax: {
        type: Number,        
        default: 0.00
    },
    category: {
        type: String, 
    },
    taxable: {
        type: Boolean,
    },
    expenseDate: {
        type: Date
    },
    paymentMethod: { //out-of-pocket, out-of-register, card, invoiced
        type: String
    },
    timeBucket: {
        type: expenseTimeComponents,
    },
});

module.exports = expense;

