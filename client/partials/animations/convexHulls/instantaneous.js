Template.ConvexHullInstantaneous.onCreated(function() {
  var self = this;
  self.autorun(function() {
    viewingId = Template.currentData().viewingId;

    if(viewingId) {
      self.subscribe('viewings.single', viewingId);
      self.subscribe('recordings.byViewingId', viewingId);
      self.subscribe('images.byViewingId', viewingId);
      self.subscribe('aois.byViewingId', viewingId);

      if(self.subscriptionsReady()) {
        viewing = Viewings.findOne(viewingId);

        if(viewing) {
          hulls = viewing.getHulls();

          hulls.forEach(function(hull) {
            plotHull(hull);
          });
        }
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

// Template.ConvexHullInstantaneous.events({
//   'click #instantButton': function() {
//     Plotly.animate('ConvexHullInstantaneous-Viewing', {
//       data: [{y: [
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//         Math.random()*1000,
//       ]}],
//       traces: [0],
//       layout: {}
//     }, {
//       transition: {
//         duration: 500,
//         easing: 'cubic-in-out'
//       }
//     })
//   },
// });

function plotInit(viewing) {
  console.log('plot init');
}

function plotAnimate() {
  console.log('plot animate');
}


function plotHull(hull) {
  var pointsTrace = {
    name: 'Fixation',
    x: hull.pointsXY.map(function(point) { return point.x; }),
    y: hull.pointsXY.map(function(point) { return point.y; }),
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: '#337ab7',
      size: 8,
    },
  };

  var polygonTrace = {
    name: 'Convex Hull',
    x: hull.polygonXY.map(function(point) { return point.x; }),
    y: hull.polygonXY.map(function(point) { return point.y; }),
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#000000',
      width: 2.5,
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
      size: 8,
    },
  };

  data = [pointsTrace, polygonTrace, centroidTrace];
  layout = {};

  if(viewing.aoi() && viewing.aoi().image()) {
    image = viewing.aoi().image();
    layout = {
      xaxis: {
        rangemode: 'tozero',
        range: [0, image.width],
        autorange: false,
      },
      yaxis: {
        rangemode: 'tozero',
        range: [0, image.height],
        autorange: false,
      },
      height: image.height/2,
      width: image.width/2,
      images: [
        {
          source: Images.link(image),
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
      ]
    };
  }

  Plotly.newPlot('ConvexHullInstantaneous-Viewing',
    data,
    layout,
  );
}

//
// Plotly.plot('graph', [{
//   x: [0, 0],
//   y: [-1, 1],
// }], {
//   xaxis: {range: [-Math.PI, Math.PI]},
//   yaxis: {range: [-1.3, 1.3]}
// }).then(function () {
//   Plotly.addFrames('graph', [
//     {
//       data: [{x: [1, -1], y: [0, 0]}],
//       name: 'frame1'
//     }, {
//       data: [{x: [0, 0], y: [-1, 1]}],
//       name: 'frame2'
//     }
//   ]);
// })
//
// function startAnimation() {
//   Plotly.animate('graph', ['frame1', 'frame2'], {
//     frame: [
//       {duration: 1500},
//       {duration: 500},
//     ],
//     transition: [
//       {duration: 800, easing: 'elastic-in'},
//       {duration: 100, easing: 'cubic-in'},
//     ],
//     mode: 'afterall'
//   })
// }
