var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var loyaltyCardSchema = new Schema({
    _id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
    businessId:{
        type: String
    },
    customerId: {
        type: String
    },
    programId: {
        type: String
    },
    programType: { //Quantity, Percentage, Amount, Tally
        type: String
    },
    remainingQuantity: { //for quantity based cards
        type: Number,
        default: 0        
    },
    remainingAmount: { //for money based cards
        type: Number,        
        default: 0        
    },
    creditPercent: { //for percentage off, storead as decimal number
        type: Number,
        default: 0        
    },
    tally: { //for quantity based cards
        type: Number,
        default: 0        
    },
    boughtOn: {
        type: Date        
    },
    expired: {// true for expired, false for not-expired
        type: Boolean,
        default: false        
    },
    updatedOn: {
        type: Date        
    }
});

module.exports = loyaltyCardSchema;

