export default async function makeGazepoints(data) {
  if(!data) { data = await this.getPoints() }

  console.log('make ' + helpers.formatNumber(data.length) + ' gazepoints!');
  Datafiles.update({ _id: this._id }, { $set: { status: 'processing' }});

  data.forEach((row) => {
    row.datafileId = this._id;
    row.participantId = this.participantId;
  });

  return data;
}












//   let stimuli = [];
//   let stimuliCount = Stimuli.find({ studyId: datafile.studyId }).count();
//
//   if(stimuliCount > 0) {
//     stimuli = Stimuli.find({ studyId: datafile.studyId }).fetch();
//   }
//
//   let aois = Aois.find({studyId: datafile.studyId }).fetch();
//
//   cleanData.forEach(function(row, ri) {
//     let stimulusId = getStimulusId(row, stimuli, datafile);
//     let aoiId = getAoiId(row, aois, datafile, stimulusId);
//
//     row.studyId = datafile.studyId;
//     row.participantId = datafile.participantId;
//     row.stimulusId = stimulusId;
//     row.aoiId = aoiId;
//
//     Gazepoints.insert(row);
//   });
//
//   Datafiles.update({_id: datafile._id}, {
//     $set: {
//       status: 'processed',
//     },
//   });
//
//   console.log('successfully finished processing datafile');
//
//   let study = Studies.findOne({ _id: datafile.studyId });
//
//   // console.log('');
//   // console.log('datafiles count: ' + study.datafilesCount());
//   // console.log('datafiles processed count: ' + study.datafilesProcessedCount());
//   // console.log('datafiles processing complete: ' + study.datafilesProcessingComplete());
//   // console.log('');
//
//   if(study.datafilesProcessingComplete()) {
//     if(Meteor.isServer) {
//       Meteor.call('studies.reprocessAnalyses', { studyId: datafile.studyId });
//     }
//   }
//
//   job.done();
//   callback();
// }
//
//
// function getStimulusId(row, stimuli, datafile) {
//   if(row.stimulusName) {
//     let stimulus;
//     let stimulusId;
//
//     if(stimuli && stimuli.length) {
//       stimulus = stimuli.find(function(stimulus) {
//         return stimulus.name == row.stimulusName;
//       });
//     }
//
//     if(stimulus) {
//       stimulusId = stimulus._id;
//       Stimuli.update({ _id: stimulusId }, {
//         $addToSet: {
//           datafileIds: datafile._id,
//         },
//       });
//     } else {
//       let newStimulusId = Stimuli.insert({
//         name: row.stimulusName,
//         studyId: datafile.studyId,
//         datafileIds: [datafile._id],
//       });
//
//       stimuli.push({'name': row.stimulusName, '_id': newStimulusId});
//
//       stimulusId = newStimulusId;
//     }
//
//     return stimulusId;
//   }
// }
//
//
// function getAoiId(row, aois, datafile, stimulusId) {
//   if(row.aoiName == '') {
//     row.aoiName = '-';
//   }
//
//   let aoi;
//   let aoiId;
//
//   if(aois && aois.length) {
//     aoi = aois.find(function(aoi) {
//       return (aoi.stimulusId == stimulusId && aoi.name == row.aoiName);
//     });
//   }
//
//   if(aoi) {
//     aoiId = aoi._id;
//   } else {
//     let newAoiId = Aois.insert({
//       name: row.aoiName,
//       studyId: datafile.studyId,
//       stimulusId: stimulusId,
//     });
//
//     aois.push({ 'name': row.aoiName, '_id': newAoiId, 'stimulusId': stimulusId });
//     aoiId = newAoiId;
//   }
//
//    return aoiId;
// }
//
// export {
//   renameHeaders,
//   getNumericPositiveCoordinatesOnly,
//   getStimuliOnly,
//   getVisualIntakesOnly,
//   getStimulusId,
//   getAoiId,
// }
