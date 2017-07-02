var config = require('./config');
global.conn = require('./connection');
var team = require('./team');

require('repl').start({prompt:'', eval:global.conn.send});
