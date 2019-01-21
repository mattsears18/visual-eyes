Template.PlotViewingCounts.helpers({
  x: () => {               return getX(); },

  layout: () => {
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

function getX() {
  viewings = Template.currentData().viewings.fetch();

  var groups = _.groupBy(viewings, function(viewing){
    return viewing.participantId + '#' + viewing.aoiId;
  });

  var counts = _.map(groups, function(group){
    return group.length;
  });

  return counts;
}
