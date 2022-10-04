var mongoose = require('mongoose'),
 	bcrypt = require('bcrypt'),
 	crypto = require('crypto'),
    ObjectId = mongoose.Types.ObjectId,
	Schema = mongoose.Schema;

//User Schema

var userSchema = new Schema({
	_id: {
        type: String,
        index: true,
        required: true,
        default: function () 
            { return new ObjectId().toString()}
    },
	username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,30}$/
    },
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: mongoose.SchemaTypes.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    services: {
    	type: Object
    },
    "services.password": {
    	type: Object
    },
    "services.password.bcrypt": {
    	type: String
    },
    profile: {
    	type: Object
    },
    "profile.firstName": {
        type: String
    },
    "profile.lastName": {
        type: String
    },
    "profile.online": {
        type: String
    },
    "profile.businessId": {
        type: String
    },
    "profile.businessUserId": {
        type: String
    },
    status: {
        type: Object
    },
    loginDisabled: {
        type: Boolean
    },
    isEndCustomer: {
        type: Boolean
    },
    roles: {
        type: [String]
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

//TO DO: will need to redo slightly such that incoming password is already hashed from the client side
userSchema.methods.isValidPassword = function(password){
	var hashPassword = crypto.createHash('sha256').update(password).digest('hex')
	console.log(hashPassword, this.services.password.bcrypt);

	return bcrypt.compareSync(hashPassword, this.services.password.bcrypt);
};

module.exports = userSchema;
