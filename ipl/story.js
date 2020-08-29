function story(matches) {
    const result = {};
    for (let match of matches) {
      const season = match.season;
      if (result[season]) {
        if (match.toss_winner==match.winner){
            result[season] += 1;
        }
      } else {
        if (match.toss_winner==match.winner){
            result[season] = 1;
        }
      }
    }
    return result;
  }
  
  module.exports = story;