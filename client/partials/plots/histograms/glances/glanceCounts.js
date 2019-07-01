Template.PlotHistogramGlanceCounts.helpers({
  x: () => getX(),

  layout: () => ({
    title: 'Glance Counts',
    xaxis: {
      title: '# of Glances per Participant per Stimulus',
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
  glances = Template.currentData().glances.fetch();
  return helpers.getGlanceCounts(glances);
}
