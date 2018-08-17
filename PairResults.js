// import { jStat } from 'jStat';
//
// Template.PairResults.onCreated(function() {
//   var self = this;
//   self.autorun(function() {
//     var studyId = FlowRouter.getParam('studyId');
//     var pairId = FlowRouter.getParam('pairId');
//
//     self.subscribe('currentStudy', studyId);
//     self.subscribe('alternatives', studyId);
//     self.subscribe('criteria', studyId);
//     self.subscribe('pairs', studyId);
//     self.subscribe('ratings', studyId);
//   });
// });
//
// Template.PairResults.helpers({
//   currentStudy: () => { return Studies.findOne(); },
//   alternatives: () => { return Alternatives.find(); },
//   criteria:     () => { return Criteria.find(); },
//   pair:         () => { return Pairs.findOne({_id: FlowRouter.getParam('pairId')}); },
//   ratings:      () => { return Ratings.find({}); },
//   jStat:        () => { return jStat; },
// });
//
// Template.PairResults.onRendered(function() {
//   var self = this;
//   self.autorun(function() {
//     var pairId = FlowRouter.getParam('pairId');
//     pair = Pairs.findOne({_id: pairId});
//
//     if(pair && pair.ratingValues()) {
//       var trace = {
//         x: pair.ratingValues(),
//         type: 'histogram',
//         xbins: {
//           start: -0.5,
//           end: 10.5,
//           size: 1,
//         },
//         marker: {
//           color: '#235cb3',
//         },
//       };
//
//       var data = [trace];
//
//       layout = {
//         xaxis: {
//           title: 'Rating',
//           autotick: false,
//           dtick: 1,
//         },
//         yaxis: {
//           title: 'Count',
//           dtick: 1,
//         },
//         bargap: 0.08,
//         margin: {
//           l: 50,
//           r: 0,
//           b: 50,
//           t: 10,
//         },
//         shapes: [{
//           type: 'line',
//           x0: pair.ratingMedian(),
//           y0: 0,
//           x1: pair.ratingMedian(),
//           y1: pair.ratingMaxCount() + 1,
//           line: {
//             color: '#73a433',
//             width: 4
//           },
//         },
//         {
//           type: 'line',
//           x0: pair.minDash(),
//           y0: 0,
//           x1: pair.minDash(),
//           y1: pair.ratingMaxCount() + 1,
//           line: {
//             color: '#73a433',
//             width: 4,
//             dash: 'dash',
//           },
//         },
//         {
//           type: 'line',
//           x0: pair.maxDash(),
//           y0: 0,
//           x1: pair.maxDash(),
//           y1: pair.ratingMaxCount() + 1,
//           line: {
//             color: '#73a433',
//             width: 4,
//             dash: 'dash',
//           },
//         },],
//         annotations: [{
//           x: pair.ratingMedian(),
//           xanchor: 'left',
//           y: pair.ratingMaxCount() + 1,
//           yanchor: 'top',
//           text: 'Median',
//           textangle: -90,
//           font: {
//             color: '#73a433',
//             size: 14,
//             weight: 800,
//           },
//           showarrow: false,
//         }],
//       };
//
//       Plotly.newPlot('histogram', data, layout);
//     }
//   });
// });
//
//
// //
// //
// // Template.body.events({
// //   'click button'(event, instance) {
// //     const data = [{
// //       x: [1, 2, 3, 4, 5],
// //       y: [1, 2, 4, 8, 16]
// //     }];
// //     const settings = {
// //       margin: {
// //         t: 0
// //       }
// //     };
// //     Plotly.plot($('#tester')[0], data, settings);
// //   },
// // });
