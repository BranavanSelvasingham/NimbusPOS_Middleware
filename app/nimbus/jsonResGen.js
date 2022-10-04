var jsonResGen = function(res, success, message, status){

	return res.json({
		message: message,
		success: success,
		status: status
	});
}

module.exports = jsonResGen