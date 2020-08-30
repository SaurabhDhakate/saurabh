function extraRunIn2016(matches, deliveries) {
    const ids = [], result = {};
    for (let match of matches) {
        const season = match.season;
        const year = 2016
        if (season == year) {
            ids.push(match.id)
        }
    }
    for (let m_id of ids) {
        for (let del of deliveries) {
            if (del.match_id == m_id) {
                if (result[del.bowling_team]) {
                    result[del.bowling_team] += Number(del.extra_runs)
                } else {
                    result[del.bowling_team] = Number(del.extra_runs)
                }
            }
        }
    }
    return result
}

module.exports = extraRunIn2016;