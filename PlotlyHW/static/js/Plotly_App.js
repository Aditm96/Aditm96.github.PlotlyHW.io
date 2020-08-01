function buildData(dropDownData) {
  d3.json("/data/samples.json").then((data) => {
    var Data = data.metadata;
    var resultArray = Data.filter(dropDownDataObj => dropDownDataObj.id == dropDownData);
    var result = resultArray[0];
    var panelData = d3.select("#sample-metadata");
    panelData.html("");
    Object.entries(result).forEach(([key, value]) => {
      panelData.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
function buildGraph(dropDown) {
  console.log(dropDown);
  d3.json("/data/samples.json").then(function(importedData) {

    var samples = importedData.samples;
    var selectedSamples = samples.filter(f => f.id == dropDown);
    var selectedSamples = samples[0];
    console.log(selectedSamples);

    var sample_values = selectedSamples.sample_values;
    var ten_otu_ids = selectedSamples.otu_ids;
    var otu_labels = selectedSamples.otu_labels;

    var BubbleLayout = {
      title: "Bacteria Samples Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID"},
      margin: { t: 30}
    };

    var BubbleData = [
      {
        x: ten_otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values, 
          color: ten_otu_ids,
          colorscale: "Earth"
        }
      }
    ]

    Plotly.newPlot("bubble", BubbleData, BubbleLayout);

    var YTicks = ten_otu_ids.slice(0, 10).map(TenOtuIds => `OTU ${TenOtuIds}`).reverse();
    var BarData = [
      {
        y: YTicks,
        x: sample_values.slice(0,10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar", 
        orientation: "h",
      }
    ];

    var BarLayout = {
      title: "Top Ten Bacteria Found",
      margin: { t: 30, l: 150}
    };

    Plotly.newPlot("bar", BarData, BarLayout);
  });  
}

function init() {
  var Selector = d3.select("#selDataset");
  d3.json("/data/samples.json").then(function(ChartData) {
    var names = ChartData.names;
    console.log(names);
    var dropDownButton = d3.select("#selDataset");
      names.forEach((Case_Number) => {
        Selector
          .append("option")
          .text(Case_Number)
          .property("value", Case_Number);
      });

      var firstSample = ChartData[0];
      buildGraph(firstSample);
      buildData(firstSample);
  });
}

function optionChanged(newSample) {
  buildGraph(newSample);
  buildData(newSample);
}

init();

