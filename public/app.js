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
  var para = document.getElementById('year').value;
  if (para==1){
    Highcharts.chart('new', {
      chart: {
          type: 'spline',
          inverted: true
      },
      title: {
          text: 'Atmosphere Temperature by Altitude'
      },
      subtitle: {
          text: 'According to the Standard Atmosphere Model'
      },
      xAxis: {
          reversed: false,
          title: {
              enabled: true,
              text: 'Altitude'
          },
          labels: {
              format: '{value} km'
          },
          accessibility: {
              rangeDescription: 'Range: 0 to 80 km.'
          },
          maxPadding: 0.05,
          showLastLabel: true
      },
      yAxis: {
          title: {
              text: 'Temperature'
          },
          labels: {
              format: '{value}°'
          },
          accessibility: {
              rangeDescription: 'Range: -90°C to 20°C.'
          },
          lineWidth: 2
      },
      legend: {
          enabled: false
      },
      tooltip: {
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x} km: {point.y}°C'
      },
      plotOptions: {
          spline: {
              marker: {
                  enable: false
              }
          }
      },
      series: [{
          name: 'Temperature',
          data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
              [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
      }]
  });
                
  }
  else{
    Highcharts.chart('new', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Browser market shares in January, 2018'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
              name: 'Chrome',
              y: 61.41,
              sliced: true,
              selected: true
          }, {
              name: 'Internet Explorer',
              y: 11.84
          }, {
              name: 'Firefox',
              y: 10.85
          }, {
              name: 'Edge',
              y: 4.67
          }, {
              name: 'Safari',
              y: 4.18
          }, {
              name: 'Other',
              y: 7.05
          }]
      }]
  });
  }
              
}

module.exports = visualizeEcoBowler2;