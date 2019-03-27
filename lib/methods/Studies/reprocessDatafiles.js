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
      Gazepoints.remove({ studyId: studyId });
      Viewings.remove({ studyId: studyId });

      Analyses.update({ studyId: studyId },
        { $set: { status: 'needsReprocessing' }},
        { multi: true }
      );

      datafiles = Datafiles.find({ studyId: study._id });

      datafiles.forEach((datafile) => {
        Stimuli.update({},
          { $pull: { datafileIds: datafile._id }},
          { multi: true }, () => {
            Datafiles.update({ _id: datafile._id }, {
              $set: { status: 'needsReprocessing' },
              $unset: {
                headersRemoved: 1,
                fileFormat: 1,
                rawRowCount: 1,
                rawRowsProcessed: 1,
                gazepointCount: 1,
                dupGazepointCount: 1,
                fixationCount: 1,
              }
            }, () => {
              Meteor.call('datafiles.makeDatafileJob', {
                datafileId: datafile._id,
              });
            });
        });
      });
    }
  },
});
