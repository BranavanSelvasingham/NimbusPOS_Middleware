
var devices = require("./devices")
var sessions = require("./sessions")
var jsonResGen = require("./jsonResGen")
var baseCRUD = require("./baseCRUD")


var dateValid = function(verifyDate){
	if ( Object.prototype.toString.call(verifyDate) === "[object Date]" ) {
	  // it is a date
	  if ( isNaN( verifyDate.getTime() ) ) {  // d.valueOf() could also work
	    // date is not valid
	    return false;
	  }
	  else {
	    // date is valid
	    return true;
	  }
	}
	else {
	  // not a date
	  return false;
	}
}

var nimbus = {
	devices: devices,
	sessions: sessions,
	tools: {
		dateValid: dateValid,
		jsonResGen: jsonResGen
	},
	baseCRUD: baseCRUD
};

module.exports = nimbus
