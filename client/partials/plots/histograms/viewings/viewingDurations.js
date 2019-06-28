Template.PlotHistogramGlanceDurations.helpers({
  x: () => getX(),

  layout: () => ({
    title: 'Glance Durations',
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
  }),
});

function getX() {
  glances = Template.currentData().glances;
  return glances.fetch().map(function(glance) {
    return glance.duration;
  });
}
