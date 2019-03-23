export default function getInitialTraces(options) {
  let hulls = this.plotHulls().getHulls();

  let pointsTrace = {
    name: 'Fixations',
    x: hulls[0].points(0),
    y: hulls[0].points(1),
    text: hulls[0].pointsTimeText(),
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: '#337ab7',
      size: 8,
    },
  };

  let polygonTrace = {
    name: 'Convex Hull',
    x: hulls[0].polygon(0),
    y: hulls[0].polygon(1),
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#000000',
      width: 2.5,
    },
  };

  let centroidTrace = {
    name: 'Centroid',
    x: [hulls[0].centroid().x],
    y: [hulls[0].centroid().y],
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
    x: [hulls[0].centroid().x],
    y: [hulls[0].centroid().y],
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#dc3545',
      width: 2.5,
    },
  };

  let lastFixationTrace = {
    name: 'Last Fixation',
    x: [hulls[0].recordings().slice(-1)[0].x],
    y: [hulls[0].recordings().slice(-1)[0].y],
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

  let lastFixationTrailTrace = {
    name: 'Last ' + Session.get('fixationTrailLength') + ' Fixations',
    x: [hulls[0].recordings().slice(-1)[0].x],
    y: [hulls[0].recordings().slice(-1)[0].y],
    mode: 'lines',
    type: 'scatter',
    line: {
      color: '#63a70a',
      width: 2.5,
    },
  };

  return [
    centroidTrailTrace,
    centroidTrace,
    pointsTrace,
    polygonTrace,
    lastFixationTrailTrace,
    lastFixationTrace,
  ];
}
