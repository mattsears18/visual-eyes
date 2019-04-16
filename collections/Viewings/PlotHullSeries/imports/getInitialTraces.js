export default function getInitialTraces(options) {
  let hulls = this.getHulls();

  let pointsTrace = {
    name: 'Fixations',
    x: hulls[0].gazepoints('x'),
    y: hulls[0].gazepoints('y'),
    text: hulls[0].gazepointsTimeText(),
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: '#337ab7',
      size: 8,
    },
  };

  let polygonTrace = {
    name: 'Convex Hull',
    x: hulls[0].polygon({ which: 'x' }),
    y: hulls[0].polygon({ which: 'y' }),
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#000000',
      width: 2.5,
    },
  };

  let centroidTrace = {
    name: 'Centroid',
    x: [hulls[0].centroid({}).x],
    y: [hulls[0].centroid({}).y],
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: 'FFFFFF',
      size: 8,
      line: {
        color: '#dc3545',
        width: 3
      },
    },
  };

  let centroidTrailTrace = {
    name: 'Centroid Trail',
    x: [-10, -11], // can't draw a line from 1 point, so have to send 2 points
    y: [-10, -11], // can't draw a line from 1 point, so have to send 2 points
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#dc3545',
      width: 2.5,
    },
  };

  let lastFixationTrace = {
    name: 'Last Fixation',
    x: [hulls[0].gazepoints().slice(-1)[0].x],
    y: [hulls[0].gazepoints().slice(-1)[0].y],
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

  let name;

  if(this.viewing().study().fixationsOnly) {
    name = 'Last ' + Session.get('fixationTrailLength') + ' Fixations';
  } else {
    name = 'Last ' + Session.get('fixationTrailLength') + ' Gaze Points';
  }

  let lastFixationTrailTrace = {
    name: name,
    x: hulls[0].fixationTrail(Session.get('fixationTrailLength'), 0),
    y: hulls[0].fixationTrail(Session.get('fixationTrailLength'), 1),
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#63a70a',
      width: 2.5,
    },
  };

  return [
    centroidTrailTrace,
    pointsTrace,
    lastFixationTrailTrace,
    centroidTrace,
    polygonTrace,
    lastFixationTrace,
  ];
}
