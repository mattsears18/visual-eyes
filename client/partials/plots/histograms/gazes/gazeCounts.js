Template.PlotHistogramGazeCounts.helpers({
  x: () => getX(),

  layout: () => ({
    title: 'Gaze Counts',
    xaxis: {
      title: '# of Gazes per Participant per Stimulus',
      dtick: 1,
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
  gazes = Template.currentData().gazes.fetch();
  return helpers.getGazeCounts(gazes);
}
