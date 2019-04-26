export default function getLastPointTrailTrace(opt) {
  opt = opt || {}
  let initial = opt.initial || false
  let hull = opt.hull

  if(typeof(hull) == 'undefined') {
    throw new Error('noHull');
  }

  let name;

  if(this.viewing.study().fixationsOnly) {
    name = 'Last ' + this.pointTrailLength + ' Fixations';
  } else {
    name = 'Last ' + this.pointTrailLength + ' Gaze Points';
  }

  if(initial) {
    return {
      name: name,
      x: this.getLastPointTrail({ hull: hull, pointTrailLength: this.pointTrailLength, which: 'x' }),
      y: this.getLastPointTrail({ hull: hull, pointTrailLength: this.pointTrailLength, which: 'y' }),
      mode: 'lines',
      type: 'scatter',
      line: {
        color: '#63a70a',
        width: 2.5,
      },
    }
  } else {
    return {
      x: this.getLastPointTrail({ hull: hull, pointTrailLength: this.pointTrailLength, which: 'x' }),
      y: this.getLastPointTrail({ hull: hull, pointTrailLength: this.pointTrailLength, which: 'y' }),
    };
  }
}
