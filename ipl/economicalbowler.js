function ecoBowler(deliveries, matches) {
    const ids = [], result = {};
    for (let match of matches) {
        const season = match.season;
        if (season == 2015) {
            ids.push(match.id)
        }
    }
    for (let m_id of ids) {
        for (let del of deliveries) {
            if (del.match_id == m_id) {
                if (result[del.bowler]) {
                    result[del.bowler]["run"] += Number(del.total_runs)
                    result[del.bowler]["bowl"] += 1
                } else {
                    result[del.bowler] = {}
                    result[del.bowler]["run"] = Number(del.total_runs)
                    result[del.bowler]["bowl"] = 1
                }
            }
        }
    }
    return result
}

module.exports = ecoBowler;