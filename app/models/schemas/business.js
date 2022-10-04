var mongoose = require('mongoose'),
	productSizes = require('../.././library/allowedProductSizes'),
    ObjectId = mongoose.Types.ObjectId,
    Schema = mongoose.Schema;

var businessProductSize = new Schema({
    code: {
        type: String,
        // allowedValues: _.pluck(productSizes, "code")
    },
    label: {
        type: String
    },
    preferred: {
        type: Boolean
    },
    available: {
        type: Boolean
    },
    order: {
        type: Number
    }
});

var businessConfiguration = new Schema({
    sizes: {
        type: [businessProductSize]
    }, 

    emailHoursReminder: {
        type: Boolean        
    },

    disableEmployeeTimeAdjust: {
        type: Boolean        
    },

    enableWaiterPinLock: {
        type: Boolean        
    },

    adminPin: {
        type: String        
    },

    allowPOSAddOnCreation: {
        type: Boolean        
    },

    allowPOSSubsitutionCreation: {
        type: Boolean        
    },

    trackTips: {
        type: Boolean        
    },

    autoEnrollNewDevices: {
        type: Boolean        
    }
});

var businessPayroll = new Schema({
    referenceStartDate: {
        type: Date
    },
    frequencyType: {
        type: String // weekly, biweekly, monthly
    }
});

var deviceSession = new Schema({
    appId: {
        type: String
    },
    deviceInfo: {
        type: Object        
    },
    label: {
        type: String        
    },
    posEnabled: {
        type: Boolean        
    },
    selectedLocation:{
        type: String        
    }
});

var businessBilling = new Schema({
    stripeCustomerId: {
        type: String        
    }
});

var business = new Schema({
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
    description: {
        type: String,        
        default: ''
    },
    phone: {
        type: Number        
    },
    email: {
        type: String        
    },
    configuration: {
        type: businessConfiguration,        
        default: {}
    },
    payroll: {
        type: businessPayroll        
    },
    devices: {
        type: [deviceSession]        
    },
    billing: {
        type: businessBilling        
    }
});

module.exports = business;
