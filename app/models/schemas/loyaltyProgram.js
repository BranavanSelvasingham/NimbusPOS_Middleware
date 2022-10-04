var mongoose = require('mongoose'),
    _ = require('underscore'),
    taxes = require('../.././library/taxes'),
    productSchema = require('./product'),
    productSizes = require('../.././library/allowedProductSizes'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

programProduct = new Schema({
    productId:{
        type: String
    },    
    sizeCodes:{
        type: [String]
    }
});

programTypes = new Schema({
    type: { //Quantity, Percentage, Amount, Tally
        type: String
    },
    quantity:{
        type: Number,        
    },
    creditPercentage:{
        type: Number,        
    },
    creditAmount:{
        type: Number,     
    },
    tally: {
        type: Number,//the number after which the next 1 is free        
    }
});

programCategories = new Schema({
    name: {
        type: String
    }
});

loyaltyProgram = new Schema({
    _id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
    name: {
        type: String,        
    },
    programType: {
        type: programTypes,        
    },
    appliesTo: {
        type: String, //"Products, Categories, Entire-Purchase"        
    },
    products: {
        type: [programProduct],        
    },
    categories:{
        type: [programCategories],        
    },
    price: {
        type: Number,                
        default: 0.00,
    },
    expiryDays:{
        type: Number,        
    },
    expiryDate: {
        type: Date,        
    },
    status: {
        type: String, //will be either Active or Disabled
        default: 'Active',        
    },
    businessId: {
        type: String,        
    },
    taxRule: {
        type: String,        
        default: taxes.allTaxCategories.RETAIL_TAX.key
    },
    purchaseLoyalty: {
        type: productSchema,        
        // default: function(){
        //     var product;
        //     let maestroSizeSet = productSizes;

        //     product = {
        //         name: this.field('name').value,
        //         status: this.field('status').value,
        //         businessId: this.field('businessId').value,
        //         categories: ["_Loyalty_Programs"],
        //         sizes: [{code: maestroSizeSet[0].code, price:this.field('price').value}],
        //         taxRule: this.field('taxRule').value,
        //         // updatedBy: this.userId,
        //         // updatedAt: new Date
        //     };
        //     return product;
        // }
    }
});

loyaltyProgram.pre("save", function(next){
        var product;
        var maestroSizeSet = productSizes;

        product = {
            name: this.field('name').value,
            status: this.field('status').value,
            businessId: this.field('businessId').value,
            categories: ["_Loyalty_Programs"],
            sizes: [{code: maestroSizeSet[0].code, price:this.field('price').value}],
            taxRule: this.field('taxRule').value,
            // updatedBy: this.userId,
            // updatedAt: new Date
        };
        
        this.update({purchaseLoyalty: product});

});

module.exports = loyaltyProgram;