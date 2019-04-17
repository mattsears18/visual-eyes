export default function getCentroidTrace({
  initial = false,
}) {
  if(initial) {
    return {
      name: 'Centroid',
      x: [this.centroid({}).x],
      y: [this.centroid({}).y],
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
    }
  } else {
    return {
      x: [this.centroid({}).x],
      y: [this.centroid({}).y],
    }
  }
}
