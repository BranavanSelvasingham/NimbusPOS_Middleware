var mongoose = require('mongoose'),
 	_ = require('underscore'),
    taxes = require('../.././library/taxes'),
    ObjectId = mongoose.Types.ObjectId,
	Schema = mongoose.Schema;


var productSize = new Schema({
    code: {
        type: String,
    },
    price: {
        type: Number,
        default: 0.00
    }
});

var productSchema = new Schema({
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
    sortPosition: {
        type: Number
    },
    description: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: "Active"  //"Active", "Out of Season", "Archived"
    },
    businessId: {
        type: String
    },
    locations: {
        type: [String], //location id
    },
    categories: {
        type: [String], //name of category
        default: []
    },
    group:{
        type: String,
        default: null
    },
    sizes: {
        type: [productSize],
        minCount: 1
    },
    variablePrice: {
        type: Boolean,
    },
    unitBasedPrice: {
        type: Boolean,
    },
    unitLabel: {
        type: String,
    },
    addOns: {
        type: [String], //prodouct-addon ids
        default: null
    },
    taxRule: {
        type: String,
        default: taxes.allTaxCategories.RETAIL_TAX.key
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
    }
});

// productSchema.methods.comparePassword = function(password){
// 	return bcrypt.compareSync(password, this.hash_password);
// };

module.exports = productSchema;
