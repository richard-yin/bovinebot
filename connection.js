var config = require('./config');
var sock = require('sockjs-client')(config.server);

sock.onmessage = function(message) {
	console.log(message.data);
}
