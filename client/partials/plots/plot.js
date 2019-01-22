Template.Plot.onRendered(function() {
  var self = this;
  self.autorun(function() {
    name = Template.currentData().name;
    layout = Template.currentData().layout;
    x = Template.currentData().x;
    y = Template.currentData().y;

    if(!layout) {
      layout = {
        height: 400,
        margin: {
          l: 30,
          r: 10,
          b: 30,
          t: 10,
        },
        bargap: 0.06,
      };
    }

    if(y && y.length) {
      var data = [
        // the data points
        {
          name: 'Data Point',
          x: x,
          y: y,
          mode: 'markers',
          type: 'scatter',
        },
        // linear regresion line
        {
          name: 'Linear Prediction',
          x: x,
          y: helpers.linearPredictions(x, y),
          mode: 'lines',
          type:'scatter',
        }
      ];
    } else {
      if(x && x.length) {
        var data = [{
          x: x,
          type: 'histogram',
        }];
      }
    }

    Plotly.newPlot('Plot-' + name, data, layout);
  });
});
