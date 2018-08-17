Template.PlotHistogram.onRendered(function() {
  var self = this;
  self.autorun(function() {
    name = Template.currentData().name;
    data = Template.currentData().data;
    layout = Template.currentData().layout;

    if(!layout) {
      layout = {
        //TODO improve responsiveness (doesn't look the best on mobile)
        // autosize: false,
        // width: 600,
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

    if(!data) {
      x = Template.currentData().x;

      if(x && x.length) {
        var data = [{
          x: x,
          type: 'histogram',
        }];

        // layout.xaxis = {
        //   rangemode: 'tozero',
        //   autorange: true,
        // }
      }
    }

    Plotly.newPlot('Plot-' + name, data, layout);
  });
});
