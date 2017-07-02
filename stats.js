var request = require('request');
var cheerio = require('cheerio');
var statsURL = 'http://www.smogon.com/stats/';

exports.load = function(format, rating, callback) {
	request(statsURL, function(error, response, body) {
		if (error) {
			console.err(error);
		} else {
			var $ = cheerio.load(body);
			var latest = $('a').last().attr('href');
			var chaosURL = statsURL + latest + 'chaos/' + format + '-' + rating + '.json';
			request({url: chaosURL, json: true}, function(error, response, body) {
				if(error) {
					console.err(error);
				} else {
					callback(body);
				}
			});
		}
	});
};
