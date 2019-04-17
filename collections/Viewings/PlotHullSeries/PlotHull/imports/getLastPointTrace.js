export default function getLastPointTrace({
  initial = false,
}) {
  if(initial) {
    return {
      name: 'Last Fixation',
      x: [this.gazepoints().slice(-1)[0].x],
      y: [this.gazepoints().slice(-1)[0].y],
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: '#FFFFFF',
        size: 15,
        line: {
          color: '#63a70a',
          width: 4
        },
      },
    }
  } else {
    return {
      x: [this.gazepoints().slice(-1)[0].x],
      y: [this.gazepoints().slice(-1)[0].y],
    };
  }
}
