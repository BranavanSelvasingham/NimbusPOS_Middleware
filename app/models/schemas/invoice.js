var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var lineItem = new Schema({
    description: {
        type: String
    },
    amount: {
        type: Number        
    },
});

var invoice = new Schema({
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
    pricingPlanType:{
        type: String, //SALES_BASED_PRICE (or null), LOCATION_BASED_PRICE        
    },
    billingYear: {
        type: Number
    },
    billingMonth: {
        type: Number //0=January, 11 = December
    },
    sales: {
        type: Number
    },
    orders: {
        type: Number
    },
    lineItems: {
        type: [lineItem],
    },
    paymentDue: {
        type: Number
    },
    paymentDueDate: {
        type: Date
    },
    paymentReceived: {
        type: Number,        
    },
    paymentReceivedDate: {
        type: Date,
    },
    status: {
        type: String //Invoiced, Paid,..
    },
    paymentMethod: {
        type: String,
    },
    paymentReferenceNumber: {
        type: String,
    }
});

module.exports = invoice;