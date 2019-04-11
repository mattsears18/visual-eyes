export default function getLayout(options) {
  let forceHeight = 600;
  let scale = forceHeight / this.stimulus().stimulusfile().fileHeight;
  let margin = { l: 50, r: 10, b: 20, t: 0, pad: 4 };

  return {
    xaxis: {
      range: [0, 1],
      showticklabels: false,
    },
    yaxis: {
      range: [0, 1],
      showticklabels: false,
    },
    height: forceHeight + margin.b + margin.t,
    width: (this.stimulus().stimulusfile().fileWidth * scale) + margin.l + margin.r + 146,
    margin: margin,
    images: [{
      source: Stimulusfiles.link(this.stimulus().stimulusfile()),
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
    }],
    hovermode: 'closest',
  }
}
