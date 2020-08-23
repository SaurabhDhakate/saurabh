function matchesWonByTeams(matches) {
    const result = {};
    for (let match of matches) {
      const season = match.season;
      if (!result[season]) {
        result[season]={}
      } 
    }

    for(let year in result){
        for (let game of matches){
            if (game.season==year){
                if (result[year][game.winner]) {
                    result[year][game.winner] += 1;
                } else {
                    result[year][game.winner] = 1;
                }
            }
        }
    }
    return result;
  }
  
  module.exports = matchesWonByTeams;