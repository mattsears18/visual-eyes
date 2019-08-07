export default function getLayout(opt) {
  opt = opt || {};

  if (typeof this.glance.stimulus().stimulusfile() === 'undefined') {
    throw new Error('noStimulusfile');
  }

  const forceHeight = 600;
  const scale = forceHeight / this.glance.stimulus().stimulusfile().fileHeight;
  const margin = {
    l: 50,
    r: 10,
    b: 20,
    t: 0,
    pad: 4,
  };

  let yrange;

  if (
    this.glance.fileFormat === 'imotions'
    || this.glance.fileFormat === 'smi'
  ) {
    yrange = [this.glance.stimulus().height, 0];
  } else {
    yrange = [0, this.glance.stimulus().height];
  }

  return {
    xaxis: {
      range: [0, this.glance.stimulus().width],
      showticklabels: true,
    },
    yaxis: {
      range: yrange,
      showticklabels: true,
    },
    height: forceHeight + margin.b + margin.t,
    width:
      this.glance.stimulus().stimulusfile().fileWidth * scale
      + margin.l
      + margin.r
      + 146,
    margin,
    images: [
      {
        source: Stimulusfiles.link(this.glance.stimulus().stimulusfile()),
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
