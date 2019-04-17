export default function getLastPointTrailTrace({
  initial = false,
}) {
  let name;

  if(this.viewing().study().fixationsOnly) {
    name = 'Last ' + this.fixationTrailLength + ' Fixations';
  } else {
    name = 'Last ' + this.fixationTrailLength + ' Gaze Points';
  }

  if(initial) {
    return {
      name: name,
      x: this.fixationTrail(this.fixationTrailLength, 'x'),
      y: this.fixationTrail(this.fixationTrailLength, 'y'),
      mode: 'lines',
      type: 'scatter',
      line: {
        color: '#63a70a',
        width: 2.5,
      },
    }
  } else {
    return {
      x: this.fixationTrail(this.fixationTrailLength, 'x'),
      y: this.fixationTrail(this.fixationTrailLength, 'y'),
    };
  }
}
