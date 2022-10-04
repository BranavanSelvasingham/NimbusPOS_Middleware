var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
	Schema = mongoose.Schema;

var productAddonSchema = new Schema({
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
    price: {
        type: Number,
        default: 0.00
    },
    categories:{
        type: [String]        
    },
    isSubstitution: {
        type: Boolean        
    },
    businessId: {
        type: String
    },
    status:{
        type: String
    },
    createdBy: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedBy: {
        type: String,
    },
    updatedAt: {
        type: Date,
    }
});

// productAddonSchema.methods.comparePassword = function(password){
// 	return bcrypt.compareSync(password, this.hash_password);
// };

module.exports = productAddonSchema;