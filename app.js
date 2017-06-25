var config = require('./config');
global.conn = require('./connection');

require('repl').start({prompt:'', eval:global.conn.send});
