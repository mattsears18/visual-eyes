Template.PlotHistogramGazeDurations.helpers({
  x: () => getX(),

  layout: () => ({
    title: 'Gaze Durations',
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
  gazes = Template.currentData().gazes;
  return gazes.fetch().map(function(gaze) {
    return gaze.duration;
  });
}
