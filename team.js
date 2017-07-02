var stats = require('./stats');
var Dict = require('collections/dict');

exports.buildTeam = function(format, rating, team, callback) {
	stats.load(format, rating, function(chaos) {
		var data = chaos.data;
		while (team.length < 6) {
			team.push(addPokemon(team, data)[0][0]);
		}
		callback(team);
	});
};

var addPokemon = function(team, data) {
	var dict = new Dict({}, key => 0);
	team.forEach(pkmn => {
		var teammates = data[pkmn].Teammates;
		for (teammate in teammates) {
			if (team.indexOf(teammate) == -1)
				dict.set(teammate, dict.get(teammate) + getSynergy(pkmn, teammate, data));
		}
	});
	return dict.entries().sorted((a, b) => b[1] - a[1]);
}

var getSynergy = function(poke1, poke2, data) {
	if (!data.hasOwnProperty(poke1) || !data.hasOwnProperty(poke2)) {
		return -1;
	}
	return Math.min(
		data[poke1].Teammates[poke2] / data[poke1]['Raw count'],
		data[poke2].Teammates[poke1] / data[poke2]['Raw count']
	);
}

exports.addPokemon = addPokemon;
