Template.ConvexHullInstantaneous.onCreated(function() {
  var self = this;
  self.autorun(function() {
    viewingId = Template.currentData().viewingId;
    self.subscribe('viewings.single', viewingId);
    self.subscribe('recordings.byViewingId', viewingId);
    self.subscribe('images.byViewingId', viewingId);

    if(self.subscriptionsReady()) {
      viewing = Viewings.findOne();

      if(viewing) {
        hulls = viewing.getHulls();

        // console.log(hulls);

        hull = hulls[0];
        console.log(hull);

        // console.log(viewing.aoi().image());

        ////////////////////////////////////////////////////////////////////////
        // Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function (err, data) {
        //   // Create a lookup table to sort and regroup the columns of data,
        //   // first by year, then by continent:
        //   var lookup = {};
        //   function getData(year, continent) {
        //     var byYear, trace;
        //     if (!(byYear = lookup[year])) {;
        //       byYear = lookup[year] = {};
        //     }
        // 	 // If a container for this year + continent doesn't exist yet,
        // 	 // then create one:
        //     if (!(trace = byYear[continent])) {
        //       trace = byYear[continent] = {
        //         x: [],
        //         y: [],
        //         id: [],
        //         text: [],
        //         marker: {size: []}
        //       };
        //     }
        //     return trace;
        //   }
        //
        //   // Go through each row, get the right trace, and append the data:
        //   for (var i = 0; i < data.length; i++) {
        //     var datum = data[i];
        //     var trace = getData(datum.year, datum.continent);
        //     trace.text.push(datum.country);
        //     trace.id.push(datum.country);
        //     trace.x.push(datum.lifeExp);
        //     trace.y.push(datum.gdpPercap);
        //     trace.marker.size.push(datum.pop);
        //   }
        //
        //   // Get the group names:
        //   var years = Object.keys(lookup);
        //   // In this case, every year includes every continent, so we
        //   // can just infer the continents from the *first* year:
        //   var firstYear = lookup[years[0]];
        //   var continents = Object.keys(firstYear);
        //
        //   // Create the main traces, one for each continent:
        //   var traces = [];
        //   for (i = 0; i < continents.length; i++) {
        //     var data = firstYear[continents[i]];
        // 	 // One small note. We're creating a single trace here, to which
        // 	 // the frames will pass data for the different years. It's
        // 	 // subtle, but to avoid data reference problems, we'll slice
        // 	 // the arrays to ensure we never write any new data into our
        // 	 // lookup table:
        //     traces.push({
        //       name: continents[i],
        //       x: data.x.slice(),
        //       y: data.y.slice(),
        //       id: data.id.slice(),
        //       text: data.text.slice(),
        //       mode: 'markers',
        //       marker: {
        //         size: data.marker.size.slice(),
        //         sizemode: 'area',
        //         sizeref: 200000
        //       }
        //     });
        //   }
        //
        //   // Create a frame for each year. Frames are effectively just
        //   // traces, except they don't need to contain the *full* trace
        //   // definition (for example, appearance). The frames just need
        //   // the parts the traces that change (here, the data).
        //   var frames = [];
        //   for (i = 0; i < years.length; i++) {
        //     frames.push({
        //       name: years[i],
        //       data: continents.map(function (continent) {
        //         return getData(years[i], continent);
        //       })
        //     })
        //   }
        //
        //   // Now create slider steps, one for each frame. The slider
        //   // executes a plotly.js API command (here, Plotly.animate).
        //   // In this example, we'll animate to one of the named frames
        //   // created in the above loop.
        //   var sliderSteps = [];
        //   for (i = 0; i < years.length; i++) {
        //     sliderSteps.push({
        //       method: 'animate',
        //       label: years[i],
        //       args: [[years[i]], {
        //         mode: 'immediate',
        //         transition: {duration: 300},
        //         frame: {duration: 300, redraw: false},
        //       }]
        //     });
        //   }
        //
        //   var layout = {
        //     xaxis: {
        //       title: 'Life Expectancy',
        //       range: [30, 85]
        //     },
        //     yaxis: {
        //       title: 'GDP per Capita',
        //       type: 'log'
        //     },
        //     hovermode: 'closest',
        // 	 // We'll use updatemenus (whose functionality includes menus as
        // 	 // well as buttons) to create a play button and a pause button.
        // 	 // The play button works by passing `null`, which indicates that
        // 	 // Plotly should animate all frames. The pause button works by
        // 	 // passing `[null]`, which indicates we'd like to interrupt any
        // 	 // currently running animations with a new list of frames. Here
        // 	 // The new list of frames is empty, so it halts the animation.
        //     updatemenus: [{
        //       x: 0,
        //       y: 0,
        //       yanchor: 'top',
        //       xanchor: 'left',
        //       showactive: false,
        //       direction: 'left',
        //       type: 'buttons',
        //       pad: {t: 87, r: 10},
        //       buttons: [{
        //         method: 'animate',
        //         args: [null, {
        //           mode: 'immediate',
        //           fromcurrent: true,
        //           transition: {duration: 300},
        //           frame: {duration: 500, redraw: false}
        //         }],
        //         label: 'Play'
        //       }, {
        //         method: 'animate',
        //         args: [[null], {
        //           mode: 'immediate',
        //           transition: {duration: 0},
        //           frame: {duration: 0, redraw: false}
        //         }],
        //         label: 'Pause'
        //       }]
        //     }],
        // 	 // Finally, add the slider and use `pad` to position it
        // 	 // nicely next to the buttons.
        //     sliders: [{
        //       pad: {l: 130, t: 55},
        //       currentvalue: {
        //         visible: true,
        //         prefix: 'Year:',
        //         xanchor: 'right',
        //         font: {size: 20, color: '#666'}
        //       },
        //       steps: sliderSteps
        //     }]
        //   };
        //
        //   // Create the plot:
        //
        // });
        ////////////////////////////////////////////////////////////////////////

        var pointsTrace = {
          name: 'Fixation',
          x: hull.pointsXY.map(function(point) { return point.x; }),
          y: hull.pointsXY.map(function(point) { return point.y; }),
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: '#337ab7',
          },
        };

        var polygonTrace = {
          name: 'Convex Hull',
          x: hull.polygonXY.map(function(point) { return point.x; }),
          y: hull.polygonXY.map(function(point) { return point.y; }),
          mode: 'lines',
          type: 'scatter',
          line: {
            color: '#337ab7',
          },
        };

        var centroidTrace = {
          name: 'Centroid',
          x: [hull.centroid.x, hull.centroid.x], //repeat twice or it won't plot
          y: [hull.centroid.y, hull.centroid.y],
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: '#dc3545',
          },
        };




        data = [pointsTrace, polygonTrace, centroidTrace];
        layout = {
          images: [
            {
              source: Images.link(viewing.aoi().image()),
              xref: 'paper',
              yref: 'paper',
              x: 0,
              y: 0,
              sizex: 1,
              sizey: 1,
              sizing: 'stretch',
              xanchor: 'left',
              yanchor: 'bottom',
              layer: 'below',
            },
          ],
          xaxis: {
            rangemode: 'tozero',
            range: [0, 1589],
            autorange: false,
          },
          yaxis: {
            rangemode: 'tozero',
            range: [0, 1109],
            autorange: false,
          },
          height: 1109/2,
          width: 1589/2,
        }

        Plotly.newPlot('ConvexHullInstantaneous-Viewing-' + viewingId,
          data,
          layout,
        );
      }
    }
  });
});

Template.ConvexHullInstantaneous.helpers({
  hulls: () => {
    viewing = Viewings.findOne();

    hulls = [];
    if(viewing) { hulls = viewing.getHulls(); }
    return hulls;
  },
  viewing: () => { return Viewings.findOne(); },
  image: () => {   return Images.findOne(); },
});
