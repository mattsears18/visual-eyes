var pointsTrace = {};
var polygonTrace = {};
var centroidTrace = {};
var centroidHistoryTrace = {};
var centroids = [];
var lastFixationTrace = {};
var lastFixationPastTrace = {};
var data;
var layout;

function plotConvexHullInstantaneousSlide(viewing) {
  pointsTrace = {};
  polygonTrace = {};
  centroidTrace = {};
  centroidHistoryTrace = {};
  centroids = [];
  lastFixationTrace = {};
  lastFixationPastTrace = {};

  data = [
    pointsTrace,
    polygonTrace,
    centroidTrace,
    centroidHistoryTrace,
    lastFixationTrace,
    lastFixationPastTrace,
  ];

  layout = {};

  if(viewing.aoi() && viewing.aoi().stimulus() && viewing.aoi().stimulus().stimulusfile()) {
    stimulus = viewing.aoi().stimulus();
    stimulusfile = viewing.aoi().stimulus().stimulusfile();

    // force width
    forceWidth = 800;
    scale =  forceWidth / stimulusfile.fileWidth;

    layout = {
      xaxis: {
        rangemode: 'tozero',
        range: [0, stimulus.width],
        autorange: false,
      },
      yaxis: {
        rangemode: 'tozero',
        range: [0, stimulus.height],
        autorange: false,
      },
      height: stimulusfile.fileHeight * scale,
      width: forceWidth,
      images: [
        {
          source: Stimulusfiles.link(stimulusfile),
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

  Plotly.newPlot('Animation',
    data,
    layout,
  );

  Meteor.call('viewings.getSlideHulls', { viewingId: viewingId }, function (err, hulls) {
    if(err) {
      console.log(err);
    } else {
      hulls.forEach(function(hull) {
        plotAnimate(hull);
      });
    }
  });
}

function getLastFixationHistory(hull) {
  points = hull.pointsXY.slice(Math.max(0, hull.pointsXY.length - Session.get('fixationTrailLength')));

  return {
    x: points.map(function(point) { return point.x; }),
    y: points.map(function(point) { return point.y; }),
  }
}

function plotAnimate(hull) {
  // console.log(hull);
  centroids.push(hull.centroid);

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

  centroidHistoryTrace = {
    name: 'Centroid History',
    x: centroids.map(function(point) { return point.x; }),
    y: centroids.map(function(point) { return point.y; }),
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#dc3545',
      width: 2.5,
    },
  };

  lastFixationTrace = {
    name: 'Last Fixation',
    x: [hull.pointsXY[(hull.pointsXY.length - 1)].x],
    y: [hull.pointsXY[(hull.pointsXY.length - 1)].y],
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: '#FFFFFF',
      size: 15,
      line: {
        color: '#63a70a',
        width: 4
      },
    },
  };

  lastFixationPastTrace = {
    name: 'Last ' + Session.get('fixationTrailLength') + ' Fixations',
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

  Plotly.animate('Animation', {
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

export default plotConvexHullInstantaneousSlide;
