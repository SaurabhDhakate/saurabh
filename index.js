const fs = require("fs");
const express = require("express")
const app = express();
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByTeams = require("./ipl/matchesWonByTeams");
const extraRunIn2016 = require("./ipl/extraRunIn2016");
const extraRunIn = require("./ipl/extraRunIn");
const story = require("./ipl/story")
const ecoBowler = require("./ipl/economicalbowler");
const port = process.env.PORT
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
        let eco = ecoBowler(deliveries,matches);
        let stories = story(matches)
        saveMatchesPlayedPerYear(result,winner,extra,eco,stories);
      })
      
    });
}

function saveMatchesPlayedPerYear(result,winner,extra,eco,stories) {
  const jsonData = {
    matchesPlayedPerYear: result,
    matchesWonByTeams: winner,
    extraRunIn2016 : extra,
    ecoBowler : eco,
    story : stories
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();

app.use(express.static('public'))

app.get('/extra-run-in',(req,res)=>{
  csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries=>{
            let year = req.query.year
            let extra_runs = extraRunIn(matches,deliveries,year);
            res.json({year,extra_runs})
        })
      });

})

app.listen(port||8010)
