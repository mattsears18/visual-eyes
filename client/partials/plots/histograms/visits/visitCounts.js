Template.PlotHistogramVisitCounts.helpers({
  x: () => getX(),

  layout: () => ({
    title: 'Visit Counts',
    xaxis: {
      title: '# of Visits per Participant per Stimulus',
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
  visits = Template.currentData().visits.fetch();
  return helpers.getVisitCounts(visits);
}