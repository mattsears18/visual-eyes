Meteor.methods({
  'studies.processDatafiles'({ studyId }) {
    if(Meteor.isServer) {
      console.log('');
      console.log('process all datafiles');

      study = Studies.findOne({_id: studyId});

      if(study) {
        study.datafileIds.forEach(function(datafileId) {
          Meteor.call('datafiles.process', {
            datafileId: datafileId,
            studyId: studyId,
          });
        });
      }
    }
  },
});
