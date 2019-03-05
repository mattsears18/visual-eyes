import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'studies.reprocessDatafiles'({ studyId, callback }) {
    check(studyId, String);

    if(Meteor.isServer) {
      console.log('reprocess datafiles');
      console.log('studyId: ' + study._id);
    }

    study = Studies.findOne({_id: studyId});

    if(study) {
      Recordings.remove({ studyId: studyId });
      Viewings.remove({ studyId: studyId });

      Analyses.update({ studyId: studyId },
        { $set: { status: 'needsReprocessing' }},
        { multi: true }
      );

      study.datafileIds.forEach(datafileId => {
        Stimuli.update({},
          { $pull: { datafileIds: datafileId }},
          { multi: true }, () => {
            Datafiles.update({ _id: datafileId }, { $set: { processed: false, processing: false, preprocessing: false }, $unset: { recordings: 1 }}, () => {
              Meteor.call('datafiles.makeDatafileJob', {
                datafileId: datafileId,
              });
            });
        });
      });
    }
  },
});
