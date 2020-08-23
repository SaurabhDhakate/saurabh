function fetchAndVisualizeData() {
    fetch("./data.json")
      .then(r => r.json())
      .then(visualizeData);
  }
  
  fetchAndVisualizeData();
  
  function visualizeData(data) {
    visualizeExtraIn2016(data.extraRunIn2016);
    return;
  }
  
  function visualizeExtraIn2016(data) {
    const seriesData = [];
    for (let team in data) {
      seriesData.push([team, data[team]]);
    }
  
    Highcharts.chart("extra-run-2016", {
      chart: {
        type: "column"
      },
      title: {
        text: "3. Extra Runs By Each Team In 2016"
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
          text: "Runs"
        }
      },
      series: [
        {
          name: "Teams",
          data: seriesData
        }
      ]
    });
  }
  