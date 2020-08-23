const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByTeams = require("./ipl/matchesWonByTeams");
const extraRunIn2016 = require("./ipl/extraRunIn2016");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries=>{
        let extra = extraRunIn2016(matches,deliveries)
        let result = matchesPlayedPerYear(matches);
        let winner = matchesWonByTeams(matches);
        saveMatchesPlayedPerYear(result,winner,extra);
      })
      
    });
}

function saveMatchesPlayedPerYear(result,winner,extra) {
  const jsonData = {
    matchesPlayedPerYear: result,
    matchesWonByTeams: winner,
    extraRunIn2016 : extra
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
