import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'studies.reprocessAnalyses'({ studyId, callback }) {
    check(studyId, String);

    if(Meteor.isServer) {
      console.log('reprocess analyses');
      console.log('studyId: ' + studyId);
    }

    study = Studies.findOne({_id: studyId});

    if(study) {
      analyses = Analyses.find({ studyId: studyId });

      analyses.forEach(function(analysis) {
        Meteor.call('analyses.makeViewingJobs', { analysisId: analysis._id });
      });
    }
  },
});
