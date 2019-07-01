// export default class AnalysesCollection extends Mongo.Collection {
//   insert(doc, callback) {
//     // Before Insert
//     // doc.createdAt = doc.createdAt || new Date();

//     // Default Meteor Insert
//     const resultId = super.insert(doc, callback);

//     // After Insert
//     Meteor.call('analyses.makeGlanceJobsJob', {
//       analysisId: resultId,
//     });

//     return resultId;
//   }
// }
