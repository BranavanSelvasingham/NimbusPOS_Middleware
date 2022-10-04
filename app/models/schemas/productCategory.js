var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
	Schema = mongoose.Schema;

var productCategorySchema = new Schema({
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
    color: {
        type: String
    },
    businessId: {
        type: String
    },
    sortPosition: {
        type: Number
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedBy: {
        type: String
    },
    updatedAt: {
        type: Date
    }
});

// productCategorySchema.methods.comparePassword = function(password){
// 	return bcrypt.compareSync(password, this.hash_password);
// };

module.exports = productCategorySchema;