import regression from 'regression';

helpers = {
  coinFlip: () => {
    return (Math.floor(Math.random() * 2) == 0);
  },
  uniqueArray: (array) => {
    return array.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  },
  millisecondsToHMSMS: (ms) => {
    return moment.utc(ms).format("HH:mm:ss.SSS");
  },
  json: (jsonObject) => {
    return JSON.stringify(jsonObject);
  },
  formatNumber: (number) => {
    return number.toLocaleString('en');
  },
  decimalToPercent: (number) => {
    return (number * 100).toFixed(2);
  },
  sortNumber: (a, b) => {
    return a - b;
  },
  toggleInArray(array, value) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    } else {
        array.splice(index, 1);
    }

    return array;
  },
  centroid(pts) {
    // https://stackoverflow.com/questions/9692448/how-can-you-find-the-centroid-of-a-concave-irregular-polygon-in-javascript
    var first = pts[0], last = pts[pts.length-1];
    if (first.x != last.x || first.y != last.y) pts.push(first);
    var twicearea=0,
    x=0, y=0,
    nPts = pts.length,
    p1, p2, f;
    for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
      p1 = pts[i]; p2 = pts[j];
      f = p1.x*p2.y - p2.x*p1.y;
      twicearea += f;
      x += ( p1.x + p2.x ) * f;
      y += ( p1.y + p2.y ) * f;
    }
    f = twicearea * 3;
    return { x:x/f, y:y/f };
  },
  linearPredictions(xs, ys) {
    equation = linearEquation(xs, ys);

    predictions = [];
    equation.points.forEach(function(point) {
      predictions.push(point[1]);
    });

    return predictions;
  },
  linearEquation(xs, ys) {
    return linearEquation(xs, ys);
  },
  getViewingCounts(viewings) {
    var groups = _.groupBy(viewings, function(viewing){
      return viewing.participantId + '#' + viewing.stimulusId;
    });

    var counts = _.map(groups, function(group){
      return group.length;
    });

    return counts;
  },
}

function linearEquation(xs, ys) {
  pairs = [];
  xs.forEach(function(x, i) {
    pairs.push([x, ys[i]]);
  });
  return regression.linear(pairs);
}

export default helpers;
