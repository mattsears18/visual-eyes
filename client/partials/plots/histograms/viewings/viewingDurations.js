Template.PlotHistogramViewingDurations.helpers({
  x: () => { return getX(); },

  layout: () => {
    return {
      title: 'Viewing Durations',
      xaxis: {
        title: 'Duration (ms)',
        rangemode: 'tozero',
        autorange: true,
      },
      yaxis: {
        title: 'Frequency',
      },
      margin: {
        l: 60,
        r: 10,
        b: 70,
        t: 50,
      },
      bargap: 0.06,
    };
  },
});

function getX() {
  viewings = Template.currentData().viewings;
  return viewings.fetch().map(function(viewing) {
    return viewing.duration;
  });
}
