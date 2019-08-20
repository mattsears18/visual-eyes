// import helpers from '../../../lib/helpers';

// export default async function makeFixations({
//   data = null
// }) {
//   if (!data) {
//     const gazepoints = await this.getGazepoints();
//   }

//   const sdPairs = [];

//   data.forEach((point) => {
//     point.datafileId = this._id;
//     point.fileFormat = this.fileFormat;

//     (point.studyId = this.studyId), (point.participantId = this.participantId);
//     if (!point.participantId) {
//       point.participantId = helpers.findOrInsert('participants', {
//         name: this.getName(),
//         studyId: this.studyId,
//       });
//     }

//     point.aoiName = point.aoiName || '-';

//     point.stimulusId = helpers.findOrInsert('stimuli', {
//       name: point.stimulusName,
//       studyId: this.studyId,
//     });

//     if (
//       !sdPairs.some(
//         el => el.stimulusId === point.stimulusId
//           && el.datafileId === point.datafileId,
//       )
//     ) {
//       sdPairs.push({
//         stimulusId: point.stimulusId,
//         datafileId: point.datafileId,
//       });
//     }

//     point.aoiId = helpers.findOrInsert('aois', {
//       name: point.aoiName,
//       stimulusId: point.stimulusId,
//       studyId: point.studyId,
//     });

//     Gazepoints.insert(point);
//   });

//   // TODO improve by adding all datafileIds to set at once, too many DB calls as-is
//   sdPairs.forEach((pair) => {
//     Stimuli.update(
//       { _id: pair.stimulusId },
//       {
//         $addToSet: {
//           datafileIds: pair.datafileId,
//         },
//       },
//     );
//   });

//   return Gazepoints.find({ datafileId: this._id });
// }