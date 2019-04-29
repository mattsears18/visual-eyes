export default function getPointsTrace(opt) {
  opt = opt || {}
  let hull = opt.hull
  let initial = opt.initial || false

  if(typeof(hull) == 'undefined') {
    throw new Error('noHull')
  }

  let name

  if(this.viewing.study().fixationsOnly) {
    name = 'Fixations'
  } else {
    name = 'Gaze Points'
  }

  if(initial) {
    return {
      name: name,
      x: hull.getPoints('x'),
      y: hull.getPoints('y'),
      text: this.getPointsTimeText({ hull: hull }),
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: '#337ab7',
        size: 8,
      },
    }
  } else {
    return {
      x: hull.getPoints('x'),
      y: hull.getPoints('y'),
    }
  }
}
