// export default function getCSVViewings() {
//   const analysis = this;
//   const viewings = Viewings.find({ analysisId: analysis._id }).fetch();

//   const data = [];

//   viewings.forEach(function(viewing) {
//     const viewingData = {
//       link: `${Meteor.absoluteUrl()}studies/${analysis.study()._id}/viewings/${
//         viewing._id
//       }`,
//       study: analysis.study().name,
//       analysis: analysis.name,
//       period: analysis.period,
//       viewingGap: analysis.viewingGap,
//       minViewingTime: analysis.minViewingTime,
//       participant: viewing.participant().name,
//       stimulus: viewing.stimulus().name,
//       viewingNumber: viewing.number,
//       stimulusWidth: viewing.stimulus().width,
//       stimulusHeight: viewing.stimulus().height,
//       stimulusArea: viewing.stimulus().area(),
//       viewingStartTime: viewing.startTime,
//       viewingEndTime: viewing.endTime,
//       viewingDuration: viewing.duration,
//       gazepointCount: viewing.gazepointCount,
//       gazepointFrequency: viewing.gazepointFrequency,
//       fixationCount: viewing.fixationCount,
//       fixationFrequency: viewing.fixationFrequency,
//       fixationProportion: '',
//       slideHullCount: '',
//       firstHullStartTime: '',
//       lastHullEndTime: '',
//       slideHullCoveragePerHull: '',
//       slideHullDurationPerHull: '',
//       slideHullDurationPerViewing: '',
//       slideHullCoverageDurationPerHull: '',
//       slideHullCoverageDurationPerViewing: '',
//       averageSlideHullCoveragePerViewing: '',
//     };

//     data.push(viewingData);
//   });

//   return CSV.unparse(data);
// }
