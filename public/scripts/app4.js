function fetchAndVisualizeData() {
    fetch("./data.json")
      .then(r => r.json())
      .then(visualizeData);
  }
  
  fetchAndVisualizeData();
  
  function visualizeData(data) {
    visualizeEcoBowler(data.ecoBowler);
    return;
  }
  
  function visualizeEcoBowler(data) {
    let seriesData = [];
    for (let bowler in data) {
      seriesData.push([bowler, 6*data[bowler]["run"]/data[bowler]["bowl"]]);
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
          text: "Runs-Per-Over"
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