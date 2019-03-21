Meteor.methods({
  'studies.saveCSVs'({ studyId, callback }) {
    check(studyId, String);

    if(Meteor.isServer) {
      console.log('save .CSVs');
      console.log('studyId: ' + studyId);
    }

    study = Studies.findOne({_id: studyId});

    if(study) {
      analyses = Analyses.find({ studyId: studyId });

      analyses.forEach(function(analysis) {
        Meteor.call('analyses.saveCSV', { analysisId: analysis._id });
      });
    }
  },
});
