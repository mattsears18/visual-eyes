import { jStat } from 'jStat';

Template.PlotViewingCounts.helpers({
  viewingCounts: () => {          return getViewingCounts(); },
  viewingCountsMin: () => {       return Math.min(...getViewingCounts()); },
  viewingCountsMax: () => {       return Math.max(...getViewingCounts()); },
  viewingCountsRange: () => {     return jStat.range(getViewingCounts()); },
  viewingCountsMean: () => {      return jStat.mean(getViewingCounts()); },
  viewingCountsMedian: () => {    return jStat.median(getViewingCounts()); },
  viewingCountsSkewness: () => {  return jStat.skewness(getViewingCounts()); },
  viewingCountsKurtosis: () => {  return jStat.kurtosis(getViewingCounts()); },

  viewingCountsData: () => {
    return [{
      x: getViewingCounts(),
      type: 'histogram',
      autobinx: false,
      xbins: {
        start: 0.5,
        end: Math.max(...getViewingCounts()),
        size: 1
      },
    }];
  },

  viewingCountsLayout: () => {
    return {
      title: 'Viewing Counts',
      xaxis: {
        title: '# of Viewings per Participant per Area of Interest',
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
    };
  },
});

function getViewingCounts() {
  viewings = Template.currentData().viewings.fetch();

  var list = [ { user_id: 301, alert_id: 199, deal_id: 32243 },
    { user_id: 301, alert_id: 200, deal_id: 32243 },
    { user_id: 301, alert_id: 200, deal_id: 107293 },
    { user_id: 301, alert_id: 200, deal_id: 277470 } ];

  var groups = _.groupBy(viewings, function(viewing){
    return viewing.participantId + '#' + viewing.aoiId;
  });

  var counts = _.map(groups, function(group){
    return group.length;
  });

  return counts;
}
