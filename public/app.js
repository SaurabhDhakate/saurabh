function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByTeams(data.matchesWonByTeams);
  visualizeExtraIn2016(data.extraRunIn2016);
  visualizeEcoBowler(data.ecoBowler);
  return;
}

function visualizeMatchesPlayedPerYear(data) {
  const seriesData = [];
  for (let year in data) {
    seriesData.push([year, data[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "1. Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

function visualizeMatchesWonByTeams(data) {
  const seasons = [],team = [],datas=[]
  for (let year in data){seasons.push(year)}
  for (let years of seasons){
      for (let teams in data[years]){if (!team.includes(teams)) team.push(teams)}
  }
  for(let item of team){
      let games = []
      for (let years of seasons){
          for (let winr in data[years]){
              if(data[years][item]){
                  if(winr==item){
                      games.push(data[years][winr])
                  }
              }else {
                  games.push(0)
                  break;
              }
          }
      }
      datas.push({name:item,data:games})
  }
  Highcharts.chart('matches-won-per-year', {
      chart: {
          type: 'column'
      },
      title: {
          text: '2. Matches won by teams in each season'
      },
      subtitle: {
          text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
          categories: seasons,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Matches'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: `<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} Matches</b></td></tr>`,
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: datas
  });
}

function visualizeExtraIn2016(data) {
  const seriesData = [];
  for (let team in data) {
    seriesData.push([team, data[team]]);
  }

  Highcharts.chart("extra-run-2016", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: '3. Extra Runs in 2016'
  },
  subtitle: {
    text:
      'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
  },
  tooltip: {
      pointFormat: '<b>{point.y}</b> Runs'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b> -{point.y} Runs'
          }
      }
  },
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: seriesData
  }]
});
}

function visualizeEcoBowler(data) {
  let seriesData = [];
  for (let bowler in data) {
    var eco = 6*data[bowler]["run"]/data[bowler]["bowl"]
    eco = (Math.floor(eco*100))/100;
    seriesData.push([bowler, eco]);
  }

  seriesData.sort(function(a, b) {
      return a[1] - b[1];
  });

  seriesData = seriesData.slice(0,10)

  Highcharts.chart("eco-bowler", {
    chart: {
      type: "column"
    },
    title: {
      text: "4. Top 10 Economical Bowler of 2015"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Bowlers",
        data: seriesData
      }
    ]
  });
}
function visualizeEcoBowler2() {
  Highcharts.chart('new', {

    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
              
}

module.exports = visualizeEcoBowler2;