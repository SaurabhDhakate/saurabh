function extraRunIn(matches, deliveries, year) {
    const match_ids = [], result = {};
    for (let match of matches) {
        const season = match.season;
        const years = year
        if (season == years) {
            match_ids.push(match.id)
        }
    }

    for (let delivey of deliveries) {
        if (match_ids.includes(delivey.match_id)) {
            if (result[delivey.bowling_team]) {
                result[delivey.bowling_team] += Number(delivey.extra_runs)
            } else {
                result[delivey.bowling_team] = Number(delivey.extra_runs)
            }
        }
    }

    return result
}

module.exports = extraRunIn;