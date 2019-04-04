const csv = require('csvtojson');

export default async function process() {
  console.log('================================================================================');
  console.log('datafiles.process');

  this.status = 'needsProcessing';
  delete this.headersRemoved;
  delete this.fileFormat;
  delete this.rawRowCount;
  delete this.rawRowsProcessed;
  delete this.gazepointCount;
  delete this.dupGazepointCount;
  delete this.fixationCount;

  Datafiles.update({ _id: this._id }, {
    $set: { status: 'needsProcessing' },
    $unset: {
      headersRemoved: 1,
      fileFormat: 1,
      rawRowCount: 1,
      rawRowsProcessed: 1,
      gazepointCount: 1,
      dupGazepointCount: 1,
      fixationCount: 1,
    }
  });

  this.removeHeaders();

  if(!this.fileFormat) {
    await this.setFileFormat();
  }

  if(this.status == 'unrecognizedFileFormat') {
    throw new Error('unrecognizedFileFormat');
  }

  console.log('remove any old gazepoints');
  Gazepoints.remove({ datafileId: this._id });

  console.log('update any old stimuli');
  Stimuli.update({},
    { $pull: { datafileIds: this._id }},
    { multi: true }
  );

  let study = Studies.findOne({ _id: this.studyId });
  if(!study) {
    throw new Error('noStudy');
  }

  this.participantId = this.study().findOrInsert('participants', {
    name: this.getName(),
    studyId: this.studyId,
  });

  Datafiles.update({ _id: this._id }, {
    $set: {
      participantId: this.participantId,
      status: 'preprocessing',
      rawRowsProcessed: 0,
    }
  }, (err, num) => {
    if(err) {
      console.log(err);
    }
  });

  let points = await this.getPoints();
  this.makeGazepoints(points);

  return;
}














// Meteor.methods({
//   'studies.reprocessDatafiles'({ studyId, callback }) {
//     check(studyId, String);
//
//     if(Meteor.isServer) {
//       console.log('reprocess datafiles');
//       console.log('studyId: ' + study._id);
//     }
//
//     study = Studies.findOne({_id: studyId});
//
//     if(study) {
//       Gazepoints.remove({ studyId: studyId });
//       Viewings.remove({ studyId: studyId });
//
//       Analyses.update({ studyId: studyId },
//         { $set: { status: 'needsReprocessing' }},
//         { multi: true }
//       );
//
//       datafiles = Datafiles.find({ studyId: study._id });
//
//       datafiles.forEach((datafile) => {
//
//       });
//     }
//   },
// });
