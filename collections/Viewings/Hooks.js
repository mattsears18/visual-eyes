import Jobs from '../Jobs/Jobs';

Viewings.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});

Viewings.after.remove(function(userId, viewing) {
  if(Meteor.isServer) {
    Jobs.remove({
      'data.viewingId': viewing._id,
    });
  }
});

Viewings.after.insert(function(userId, doc) {
  // Meteor.call('viewings.makeHullJobs', { viewingId: doc._id });
});

Viewings.after.update((userId, viewing, fieldNames, modifier, options) => {
  if(Meteor.isServer) {
    analysis = Analyses.findOne({ _id: viewing.analysisId });
    if(analysis.viewingsComplete() && analysis.status != 'processed') {
      // viewing = Viewings.findOne({ _id: viewing._id });
      Analyses.update({ _id: viewing.analysisId }, { $set: { status: 'processed' }});
      // console.log('created ' + analysis.viewings().count() + ' viewings for analysisId: ' + analysis._id);
      // console.log('stimulus: ' + viewing.stimulus().name + ' participantId: ' + viewing.participant().name + ' viewing: ' + viewing.number);
    }
  }
});
