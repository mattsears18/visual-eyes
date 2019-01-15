import { jStat } from 'jStat';

Template.PlotViewingDurations.helpers({
  durations: () => {              return getDurations(); },
  durationMin: () => {            return Math.min(...getDurations()); },
  durationMax: () => {            return Math.max(...getDurations()); },
  durationRange: () => {          return jStat.range(getDurations()); },
  durationMean: () => {           return jStat.mean(getDurations()); },
  durationMedian: () => {         return jStat.median(getDurations()); },
  durationSkewness: () => {       return jStat.skewness(getDurations()); },
  durationKurtosis: () => {       return jStat.kurtosis(getDurations()); },

  durationsLayout: () => {
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

function getDurations() {
  viewings = Template.currentData().viewings;
  return viewings.fetch().map(function(viewing) {
    return viewing.duration;
  });
}
