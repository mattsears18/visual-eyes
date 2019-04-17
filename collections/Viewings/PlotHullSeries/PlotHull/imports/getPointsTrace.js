export default function getPointsTrace({
  initial = false,
}) {
  let name;

  if(this.viewing().study().fixationsOnly) {
    name = 'Fixations';
  } else {
    name = 'Gaze Points';
  }

  if(initial) {
    return {
      name: name,
      x: this.gazepoints('x'),
      y: this.gazepoints('y'),
      text: this.gazepointsTimeText(),
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: '#337ab7',
        size: 8,
      },
    }
  } else {
    return {
      x: this.gazepoints('x'),
      y: this.gazepoints('y'),
    };
  }
}
