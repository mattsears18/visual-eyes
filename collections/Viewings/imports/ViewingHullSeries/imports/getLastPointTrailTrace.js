export default function getLastPointTrailTrace(opt) {
  opt = opt || {}
  let initial = opt.initial || false
  let hull = opt.hull
  let pointTrailLength = typeof(opt.pointTrailLength) == 'number' ? opt.pointTrailLength : this.pointTrailLength

  if(typeof(hull) == 'undefined') {
    throw new Error('noHull');
  }

  let data = {
    x: this.getLastPointTrail({ hull: hull, which: 'x', pointTrailLength: pointTrailLength }),
    y: this.getLastPointTrail({ hull: hull, which: 'y', pointTrailLength: pointTrailLength }),
  }

  if(initial) {
    let name;

    if(this.viewing.study().fixationsOnly) {
      name = 'Last ' + this.pointTrailLength + ' Fixations';
    } else {
      name = 'Last ' + this.pointTrailLength + ' Gaze Points';
    }

    data.name = name
    data.mode = 'lines'
    data.type = 'scatter'
    data.line = { color: '#63a70a', width: 2.5 }
  }

  return data
}
