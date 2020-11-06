function extraRunIn2016(matches, deliveries) {
    const match_ids = [], result = {};
    for (let match of matches) {
        const season = match.season;
        const year = 2016
        if (season == year) {
            match_ids.push(match.id)
        }
    }

    for (let delivery of deliveries) {
        if (match_ids.includes(delivery.match_id)) {
            if (result[delivery.bowling_team]) {
                result[delivery.bowling_team] += Number(delivery.extra_runs)
            } else {
                result[delivery.bowling_team] = Number(delivery.extra_runs)
            }
        }
    }

    return result
}

module.exports = extraRunIn2016;