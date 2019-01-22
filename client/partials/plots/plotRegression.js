import { jStat } from 'jStat';

Template.PlotRegression.helpers({
  x: () => { return getX(); },
  y: () => { return getY(); },

  layout: () => {
    return {
      title: 'Independent Variable vs Dependent Variable',
      xaxis: {
        title: 'Independent Variable',
        autorange: true,
      },
      yaxis: {
        title: 'Dependent Variable',
        autorange: true,
      },
      margin: {
        l: 60,
        r: 10,
        b: 70,
        t: 50,
      },
      bargap: 0.06,
      showlegend: false,
    };
  },
});

function getX() {
  return [1,2,3,4,5,6,7,8,9];
}

function getY() {
  return [2,4,6,8,10,12,14,16,18];
}
