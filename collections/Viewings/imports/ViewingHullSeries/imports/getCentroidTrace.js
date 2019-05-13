export default function getCentroidTrace(opt) {
  opt = opt || {};
  const initial = opt.initial || false;
  const hull = this.getHull(opt);

  if (initial) {
    return {
      name: 'Centroid',
      x: [hull.centroid().x],
      y: [hull.centroid().y],
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: 'FFFFFF',
        size: 8,
        line: {
          color: '#dc3545',
          width: 3,
        },
      },
    };
  }
  return {
    x: [hull.centroid().x],
    y: [hull.centroid().y],
  };
}
