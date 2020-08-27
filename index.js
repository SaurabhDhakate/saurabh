const fs = require("fs");
const express = require("express")
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByTeams = require("./ipl/matchesWonByTeams");
const extraRunIn2016 = require("./ipl/extraRunIn2016");
const extraRunIn = require("./ipl/extraRunIn");
const ecoBowler = require("./ipl/economicalbowler");
const port = process.env.PORT || 8087
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
        saveMatchesPlayedPerYear(result,winner,extra,eco);
      })
      
    });
}

function saveMatchesPlayedPerYear(result,winner,extra,eco) {
  const jsonData = {
    matchesPlayedPerYear: result,
    matchesWonByTeams: winner,
    extraRunIn2016 : extra,
    ecoBowler : eco 
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();


const app = express();

app.use(express.static('public'))

app.get('/year/:id',(req,res)=>{
  csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries=>{
            let extra = extraRunIn(matches,deliveries,req.params.id);
            res.send(extra,req.params.id)
        })
      });

})

app.listen(port)