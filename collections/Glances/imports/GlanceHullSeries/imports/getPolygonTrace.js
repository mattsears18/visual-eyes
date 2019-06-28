export default function getPolygonTrace(opt) {
  opt = opt || {};
  const initial = opt.initial || false;
  const hull = this.getHull(opt);

  if (initial) {
    return {
      name: 'Convex Hull',
      x: hull.getPolygon({ which: 'x' }),
      y: hull.getPolygon({ which: 'y' }),
      mode: 'lines',
      type: 'scatter',
      line: {
        color: '#000000',
        width: 2.5,
      },
    };
  }
  return {
    x: hull.getPolygon({ which: 'x' }),
    y: hull.getPolygon({ which: 'y' }),
  };
}
