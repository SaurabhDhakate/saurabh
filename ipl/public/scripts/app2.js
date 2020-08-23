function fetchAndVisualizeData() {
    fetch("./data.json")
      .then(r => r.json())
      .then(visualizeData);
  }
  
  fetchAndVisualizeData();
  
  function visualizeData(data) {
    visualizeMatchesWonByTeams(data.matchesWonByTeams);
    return;
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
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} Matches</b></td></tr>',
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