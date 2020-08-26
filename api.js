const csv = require("csvtojson");
const fs = require("fs");
const express = require("express");
const app = express();
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data2.json";
const extraRunIn2016 = require("./ipl/extraRunIn");
var port = process.env.PORT ||8080

function saveMatchesPlayedPerYear(extra) {
    const jsonData = {
      extraRunIn2016 : extra,
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}



app.get('/year/:id',(req,res)=>{
    csv()
      .fromFile(MATCHES_FILE_PATH)
      .then(matches => {
        csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries=>{
            let extra = extraRunIn2016(matches,deliveries,req.params.id);
            saveMatchesPlayedPerYear(extra)
        })
      });
    res.sendFile(__dirname+JSON_OUTPUT_FILE_PATH.replace(".",""))
    
})

app.listen(port)