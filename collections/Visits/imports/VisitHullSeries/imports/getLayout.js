export default function getLayout(opts) {
  opts = opts || {};

  if (typeof this.visit.stimulus().stimulusfile() === 'undefined') {
    throw new Error('noStimulusfile');
  }

  const forceHeight = 600;
  const scale = forceHeight / this.visit.stimulus().stimulusfile().fileHeight;
  const margin = {
    l: 50,
    r: 10,
    b: 20,
    t: 0,
    pad: 4,
  };

  let yrange;

  if (this.visit.fileFormat === 'imotions' || this.visit.fileFormat === 'smi') {
    yrange = [this.visit.stimulus().height, 0];
  } else {
    yrange = [0, this.visit.stimulus().height];
  }

  return {
    xaxis: {
      range: [0, this.visit.stimulus().width],
      showticklabels: true,
    },
    yaxis: {
      range: yrange,
      showticklabels: true,
    },
    height: forceHeight + margin.b + margin.t,
    width:
      this.visit.stimulus().stimulusfile().fileWidth * scale
      + margin.l
      + margin.r
      + 146,
    margin,
    images: [
      {
        source: Stimulusfiles.link(this.visit.stimulus().stimulusfile()),
        xref: 'paper',
        yref: 'paper',
        x: 0,
        y: 0,
        sizex: 1,
        sizey: 1,
        sizing: 'stretch',
        xanchor: 'left',
        yanchor: 'bottom',
        layer: 'below',
      },
    ],
    hovermode: 'closest',
  };
}
