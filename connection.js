var config = require('./config');
var request = require('request');

var sock = require('sockjs-client')(config.server);

sock.onmessage = function(message) {
	if (message.data.startsWith("|challstr|")) {
		login(message.data);
	} else {
		console.log(message.data);
	}
}

var login = function(challstr) {
	var loginData = {
		act:"login",
		name:config.userid,
		pass:config.password,
		challstr:challstr.slice("|challstr|".length)
	}
	console.log(loginData.challstr);
	request.post({url:config.login + "action.php", formData: loginData,}, function callback(err, response, body) {
		if (err) {
			return console.error("Login failed: ", err);
		}
		var data = JSON.parse(body.slice(1));
		console.log(data);
		send("|/trn " + config.userid + ",0," + data.assertion);
	});
}

var send = function(message) {
	sock.send(message);
	console.log("> " + message);
}

exports.send = send;
