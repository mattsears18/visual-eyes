// export default function getCSVGlances() {
//   const analysis = this;
//   const glances = Glances.find({ analysisId: analysis._id }).fetch();

//   const data = [];

//   glances.forEach(function(glance) {
//     const glanceData = {
//       link: `${Meteor.absoluteUrl()}studies/${analysis.study()._id}/glances/${
//         glance._id
//       }`,
//       study: analysis.study().name,
//       analysis: analysis.name,
//       period: analysis.period,
//       glanceGap: analysis.glanceGap,
//       minGlanceTime: analysis.minGlanceTime,
//       participant: glance.participant().name,
//       stimulus: glance.stimulus().name,
//       glanceNumber: glance.number,
//       stimulusWidth: glance.stimulus().width,
//       stimulusHeight: glance.stimulus().height,
//       stimulusArea: glance.stimulus().area(),
//       glanceStartTime: glance.startTime,
//       glanceEndTime: glance.endTime,
//       glanceDuration: glance.duration,
//       gazepointCount: glance.gazepointCount,
//       gazepointFrequency: glance.gazepointFrequency,
//       fixationCount: glance.fixationCount,
//       fixationFrequency: glance.fixationFrequency,
//       fixationProportion: '',
//       slideHullCount: '',
//       firstHullStartTime: '',
//       lastHullEndTime: '',
//       slideHullCoveragePerHull: '',
//       slideHullDurationPerHull: '',
//       slideHullDurationPerGlance: '',
//       slideHullCoverageDurationPerHull: '',
//       slideHullCoverageDurationPerGlance: '',
//       averageSlideHullCoveragePerGlance: '',
//     };

//     data.push(glanceData);
//   });

//   return CSV.unparse(data);
// }
