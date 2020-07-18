d3.json("/data/samples.json").then(function(ChartData) {
  var names = ChartData.names;
  console.log(names);
  var dropDownButton = d3.select("#selDataset");
    names.forEach((Case_Number) => {
      var row = dropDownButton.append("option");
      row.text(Case_Number);
      row.attr("value", "100");
      row.property("value", "101");
    });
})

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
    console.log(ten_otu_ids);

    var Ten_Sample_Values = sample_values.sort((a, b) => b - a);
    var top_ten_sv = Ten_Sample_Values.slice(0, 10);
    console.log(top_ten_sv);

    var Ten_otu_ids = ten_otu_ids.sort((c, d) => d - c);
    var top_ten_otu_ids = Ten_otu_ids.slice(0, 10);
    console.log(top_ten_otu_ids);

    var Ten_otu_labels = otu_labels.sort((c, d) => d - c);
    var top_ten_otu_labels = Ten_otu_labels.slice(0, 10);
    console.log(top_ten_otu_labels);

    var demographic_id = importedData.metadata[0];
    var demographic_ethnicity = importedData.metadata[1];
    var demographic_gender = importedData.metadata[2];
    var demographic_age = importedData.metadata[3];
    var demogrpahic_location = importedData.metadata[4];
    var demogrpahic_bbtype = importedData.metadata[5];
    var demographic_wfreq = importedData.metadata[6];
    
    var bar_plot_trace = {
      type: "bar",
      x: top_ten_sv,
      y: top_ten_otu_ids,
      orientation: "h",
      text: top_ten_otu_labels
    };

    var layout2  = {
      title: "Bubble Plot"
    }

    var bubble_plot_trace = [{
      x: top_ten_sv,
      y: top_ten_otu_ids,
      type: "bubble",
      text: top_ten_otu_labels,
      marker: {
        size: top_ten_sv,
        color: top_ten_otu_ids
      }
    }]

    var data = [bar_plot_trace];

    var layout1 = {
      title: "Bar Plot", 
    };

    Plotly.newPlot("bar", data, layout1);
    Plotly.newPlot("bubble", bubble_plot_trace, layout2);
  })

}

buildGraph()