import Viewings from './Viewings';
import Jobs from '../Jobs/Jobs';

Viewings.before.insert(function (userId, doc) {
  doc.createdAt = new Date;

  doc.minRecordingTime = Meteor.call('viewings.getMinTime', { viewing: doc });
  doc.maxRecordingTime = Meteor.call('viewings.getMaxTime', { viewing: doc });
  doc.duration = doc.maxRecordingTime - doc.minRecordingTime;
});

Viewings.after.remove(function(userId, viewing) {
  if(Meteor.isServer) {
    Jobs.remove({
      'data.viewingId': viewing._id,
    });
  }
});

Viewings.after.insert(function(userId, viewing) {
  Meteor.call('viewings.makeHullJobs', { viewingId: viewing._id });
});

Viewings.after.update((userId, viewing, fieldNames, modifier, options) => {
  if(Meteor.isServer) {
    analysis = Analyses.findOne({ _id: viewing.analysisId });
    if(analysis.viewingsComplete() && analysis.status != 'processed') {
      Analyses.update({ _id: viewing.analysisId }, { $set: { status: 'processed' }});
      console.log('created ' + analysis.viewings().count() + ' viewings for analysisId: ' + analysis._id);
    }
  }
});
