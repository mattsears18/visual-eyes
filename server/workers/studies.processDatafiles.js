// import Jobs from '../../collections/Jobs/Jobs';
//
// queue = Jobs.processJobs(
//   'studies.processDatafiles',
//
//   function (job, callback) {
//     Meteor.call('studies.processDatafiles', {
//       studyId: job.data.studyId,
//     });
//
//     // Only called when there is a valid job
//     job.done();
//     callback();
//   }
// );
