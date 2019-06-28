// export default function getCSVGazes() {
//   const analysis = this;
//   const gazes = Gazes.find({ analysisId: analysis._id }).fetch();

//   const data = [];

//   gazes.forEach(function(gaze) {
//     const gazeData = {
//       link: `${Meteor.absoluteUrl()}studies/${analysis.study()._id}/gazes/${
//         gaze._id
//       }`,
//       study: analysis.study().name,
//       analysis: analysis.name,
//       period: analysis.period,
//       gazeGap: analysis.gazeGap,
//       minGazeTime: analysis.minGazeTime,
//       participant: gaze.participant().name,
//       stimulus: gaze.stimulus().name,
//       gazeNumber: gaze.number,
//       stimulusWidth: gaze.stimulus().width,
//       stimulusHeight: gaze.stimulus().height,
//       stimulusArea: gaze.stimulus().area(),
//       gazeStartTime: gaze.startTime,
//       gazeEndTime: gaze.endTime,
//       gazeDuration: gaze.duration,
//       gazepointCount: gaze.gazepointCount,
//       gazepointFrequency: gaze.gazepointFrequency,
//       fixationCount: gaze.fixationCount,
//       fixationFrequency: gaze.fixationFrequency,
//       fixationProportion: '',
//       slideHullCount: '',
//       firstHullStartTime: '',
//       lastHullEndTime: '',
//       slideHullCoveragePerHull: '',
//       slideHullDurationPerHull: '',
//       slideHullDurationPerGaze: '',
//       slideHullCoverageDurationPerHull: '',
//       slideHullCoverageDurationPerGaze: '',
//       averageSlideHullCoveragePerGaze: '',
//     };

//     data.push(gazeData);
//   });

//   return CSV.unparse(data);
// }
