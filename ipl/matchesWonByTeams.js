function matchesWonByTeams(matches) {
    const result = {};
    for (let match of matches) {
        const season = match.season;
        if(!result[season]){
            result[season] = {}
        }
    }

    for (let game of matches) {
        if (result.hasOwnProperty(game.season)) {
            if (result[game.season][game.winner]) {
                result[game.season][game.winner] += 1;
            } else {
                result[game.season][game.winner] = 1;
            }
        }
    }

    return result;
}

module.exports = matchesWonByTeams;