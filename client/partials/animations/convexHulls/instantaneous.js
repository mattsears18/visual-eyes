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
          plotInit(viewing);
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

var pointsTrace = {};
var polygonTrace = {};
var centroidTrace = {};
var centroidHistoryTrace = {};
var centroids = [];
var lastFixationTrace = {};
var lastFixationPastTrace = {};
var lastFixationLength;
var data;
var layout;

function plotInit(viewing) {
  lastFixationLength = 5;

  data = [
    pointsTrace,
    polygonTrace,
    centroidTrace,
    centroidHistoryTrace,
    lastFixationTrace,
    lastFixationPastTrace,
  ];

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

  hulls = viewing.getHulls();

  hulls.forEach(function(hull) {
    plotAnimate(hull);
  });
}

function getLastFixationHistory(hull) {
  points = hull.pointsXY.slice(Math.max(0, hull.pointsXY.length - lastFixationLength));

  return {
    x: points.map(function(point) { return point.x; }),
    y: points.map(function(point) { return point.y; }),
  }
}

function plotAnimate(hull) {
  pointsTrace = {
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

  polygonTrace = {
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

  centroidTrace = {
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

  // centroidHistoryTrace = {
  //   name: 'Centroid History',
  //   x: getCentroidHistory(hull).x,
  //   y: getCentroidHistory(hull).y,
  //   mode: 'lines',
  //   type: 'scatter',
  //   line: {
  //     color: '#dc3545',
  //     width: 2.5,
  //   },
  // };

  lastFixationTrace = {
    name: 'Last Fixation',
    x: [hull.pointsXY[(hull.pointsXY.length - 1)].x],
    y: [hull.pointsXY[(hull.pointsXY.length - 1)].y],
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: '#63a70a',
      size: 15,
    },
  };

  lastFixationPastTrace = {
    name: 'Last ' + lastFixationLength + ' Fixations',
    x: getLastFixationHistory(hull).x,
    y: getLastFixationHistory(hull).y,
    mode: 'lines',
    type: 'scatter',
    line: {
      // color: '#dc3545',
      color: '#63a70a',
      width: 2.5,
    },
  };

  data = [
    pointsTrace,
    polygonTrace,
    centroidTrace,
    centroidHistoryTrace,
    lastFixationTrace,
    lastFixationPastTrace,
  ];

  Plotly.animate('ConvexHullInstantaneous-Viewing', {
    data: data,
  }, {
    transition: {
      duration: 0,
    },
    frame: {
      duration: hull.timeStep,
    }
  })
}
