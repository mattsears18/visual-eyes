export default function getPointsTrace(opt) {
  opt = opt || {};
  const hull = this.getHull(opt);
  const initial = opt.initial || false;

  let name;

  if (this.viewing.study().fixationsOnly) {
    name = 'Fixations';
  } else {
    name = 'Gaze Points';
  }

  if (initial) {
    return {
      name,
      x: hull.getPoints('x'),
      y: hull.getPoints('y'),
      text: this.getPointsTimeText({ hull }),
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: '#337ab7',
        size: 8,
      },
    };
  }
  return {
    x: hull.getPoints('x'),
    y: hull.getPoints('y'),
  };
}
