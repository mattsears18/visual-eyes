export default function getPolygonTrace({
  initial = false,
}) {
  if(initial) {
    return {
      name: 'Convex Hull',
      x: this.polygon({ which: 'x' }),
      y: this.polygon({ which: 'y' }),
      mode: 'lines',
      type: 'scatter',
      line: {
        color: '#000000',
        width: 2.5,
      },
    }
  } else {
    return {
      x: this.polygon({ which: 'x' }),
      y: this.polygon({ which: 'y' }),
    };
  }
}
