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
  