Template.PlotHistogramVisitDurations.helpers({
  x: () => getX(),

  layout: () => ({
    title: 'Visit Durations',
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
  visits = Template.currentData().visits;
  return visits.fetch().map(function(visit) {
    return visit.duration;
  });
}
