import regression from 'regression';
import distinctPoints from './imports/distinctPoints';
import findOrInsert from './imports/findOrInsert';

helpers = {
  distinctPoints,
  findOrInsert,

  isFloaty(n){
    return (!isNaN(parseFloat(n)));
  },
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
    if(number) {
      return number.toLocaleString('en');
    } else {
      return 0;
    }
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
  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  },
  // centroid(points) {
  //   var pts = points.slice();
  //   if(pts.length == 1) {
  //     return { x: pts[0].x, y: pts[0].y }
  //   } else {
  //     // https://stackoverflow.com/questions/9692448/how-can-you-find-the-centroid-of-a-concave-irregular-polygon-in-javascript
  //     var first = pts[0], last = pts[pts.length-1];
  //     if (first.x != last.x || first.y != last.y) pts.push(first);
  //     var twicearea=0,
  //     x=0, y=0,
  //     nPts = pts.length,
  //     p1, p2, f;
  //     for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
  //       p1 = pts[i]; p2 = pts[j];
  //       f = p1.x*p2.y - p2.x*p1.y;
  //       twicearea += f;
  //       x += ( p1.x + p2.x ) * f;
  //       y += ( p1.y + p2.y ) * f;
  //     }
  //     f = twicearea * 3;
  //     return { x:x/f, y:y/f };
  //   }
  // },
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
  equals(a, b) {
    return a === b;
  },
  keyInArray(key, array) {
    let hasKey = false;
    let i = 0;
    while(array[i] && !hasKey) {
      if(array[i].hasOwnProperty(key)) {
        hasKey = true;
      }
      i++;
    }
    return hasKey;
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
