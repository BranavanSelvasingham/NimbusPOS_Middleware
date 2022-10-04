var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var productSize = new Schema({
    code: {
        type: String,
        // allowedValues: _.pluck(Maestro.Products.Sizes, "code")
    },
    price: {
        type: Number,
        default: 0.00
    }
});

var orderProduct = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    sizes: {
        type: [productSize],
        // minCount: 1
    }
});

var orderItemAddOns = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String 
    },
    price: {
        type: Number,      
        default: 0.00
    },
});

var orderItem = new Schema({
    itemNumber: {
        type: Number,               
    },
    product: {
        type: orderProduct
    },
    seatNumber:{
        type: Number,       
    },
    sentToKitchen: {
        type: Boolean,        
    },
    isRedeemItem: {
        type: Boolean,        
    },
    isManualRedeem: {
        type: Boolean,        
    },
    variablePrice: {
        type: Boolean,        
    },
    unitBasedPrice: {
        type: Boolean,        
    },
    unitBasedPriceQuantity: {
        type: Number,               
    },
    unitPrice: {
        type: Number,               
    },
    unitLabel: {
        type: String,        
    },
    notes: {
        type: [String],        
    },
    size: {
        type: productSize
    },
    addOns: {
        type: [orderItemAddOns],        
        default: null
    },
    quantity: {
        type: Number
    },
    redeemed: {
        type: Number,        
        default: null
    },
    total: {
        type: Number,        
    }
});

var taxComponents = new Schema({
    gst: {
        type: Number,               
        default: 0.00
    },

    pst: {
        type: Number,               
        default: 0.00
    },

    hst: {
        type: Number,               
        default: 0.00
    },
});

var orderPriceSchema = new Schema({
    subtotal: {
        type: Number,               
        default: 0.00
    },
    discount: {
        type: Number,               
        default: 0.00
    },
    adjustments: {
        type: Number,               
        default: 0.00
    },
    tax: {
        type: Number,               
        default: 0.00
    },
    taxComponents: {
        type: taxComponents,        
    },
    total: {
        type: Number,        
    }
});

var giftCard = new Schema({
    cardId: {
        type: String,        
    },
    programId: {
        type: String //must be id of the Loyalty Program
    },
    redeemedAmount: {
        type: Number,        
    }
});

var loyaltyCard = new Schema({
    cardId: {
        type: String,        
    },
    programId: {
        type: String //id of loyalty program
    },
    redeemedQuantity: {
        type: Number    //qty used in transaction
    }
});

var paymentInformation = new Schema({
    method: {
        type: String,
        // allowedValues: Maestro.Payment.MethodsEnum.keys()
    },
    amount: {
        type: Number,        
    },
    giftCardTotal: {
        type: Number,               
        default: null
    },
    giftCards: {
        type: [giftCard],        
        default: null
    },
    quantityCards:{
        type: [loyaltyCard],        
        default: null
    },
    rounding: {
        type: Number,               
        default: null
    },
    received: {
        type: Number,        
    },
    cashGiven: {
        type: Number,               
    },
    change: {
        type: Number,               
        default: null
    },
    tips: {
        type: Number,               
    }
});

var timeComponents = new Schema({
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

var orderInformation = new Schema({
    orderType: {
        type: String,        
    },
    orderName: {
        type: String,        
    },
    orderPhone: {
        type: String,        
    },
    unitNumber: {
        type: String,        
    },
    buzzerNumber: {
        type: String,        
    },
    streetNumber: {
        type: String,        
    },
    street: {
        type: String,        
    },
    city: {
        type: String,        
    },
    postalCode: {
        type: String,        
    },
    instructions: {
        type: String,        
    },
});

var order = new Schema({
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
    locationId: {
        type: String
    },
    status: {
        type: String, //Completed, Cancelled        
    },
    orderInformation: {
        type: orderInformation,        
    },
    customerId: {
        type: String, //must be id of the Customer        
        default: null
    },
    waiterId: {
        type: String,        
    },
    tableId: {
        type: String,        
    },
    splitOrders: {
        type: [String],        
    },
    originalOrderId: {
        type: String,        
    },
    items: {
        type: [orderItem],
        // minCount: 1
    },
    subtotals: {
        type: orderPriceSchema
    },
    payment: {
        type: paymentInformation,        
    },
    dailyOrderNumber: {//unique only for day and location
        type: Number,        
    },
    uniqueOrderNumber:{//unique business wide
        type: Number,        
    },
    createdBy: {
        type: String,        
        // autoValue: function() {
        //     if (this.isInsert) {
        //         return this.userId;
        //     } else if (this.isUpsert) {
        //         return {$setOnInsert: this.userId};
        //     } else {
        //         this.unset();
        //     }
        // }
    },
    createdAt: {
        type: Date,        
        // autoValue: function() {
        //     if (this.isInsert) {
        //         return new Date;
        //     } else if (this.isUpsert) {
        //         return {$setOnInsert: new Date};
        //     } else {
        //         this.unset();
        //     }
        // }
    },
    timeBucket: {
        type: timeComponents,        
    },
    updatedBy: {
        type: String
    },
    updatedAt: {
        type: Date
    }
});

module.exports = order;