import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'studies.reprocessAnalyses'({ studyId, callback }) {
    check(studyId, String);

    study = Studies.findOne({_id: studyId});

    if(study) {
      Viewings.remove({ studyId: studyId });

      analyses = Analyses.find({ studyId: studyId });

      analyses.forEach(function(analysis) {
        Meteor.call('analyses.makeParticipantJobs', { analysisId: analysis._id });
      });
    }
  },
});
