export default function makeGlances({ participantId, stimulusId }) {
  const analysisType = this.type !== null && this.type === 'iso15007' ? 'iso15007' : 'custom';

  console.log(analysisType);
  console.log(participantId);
  console.log(stimulusId);

  if (!participantId) {
    throw new Error('noParticipantId');
  }
  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  if (analysisType === 'custom') {
    if (!stimulusId) {
      throw new Error('noStimulusId');
    }
    const stimulus = Stimuli.findOne({ _id: stimulusId });
    if (!stimulus) {
      throw new Error('noStimulusFound');
    }
  }

  const search = { participantId, stimulusId };

  console.log(`search: ${search}`);

  // if (this.ignoreOutsideImage) {
  //   if (stimulus.width) {
  //     search.x = { $gte: 0, $lte: stimulus.width };
  //   } else {
  //     search.x = { $gte: 0 };
  //   }

  //   if (stimulus.height) {
  //     search.y = { $gte: 0, $lte: stimulus.height };
  //   } else {
  //     search.y = { $gte: 0 };
  //   }
  // }

  // // console.log('participant: ' + participant.name + ' stimulus: ' + stimulus.name);

  // const allGazepoints = Gazepoints.find(search, { sort: { timestamp: 1 } });
  // const allGazepointsArr = allGazepoints.fetch();
  // const glanceIds = [];

  // // console.log(`gazepoint count: ${gazepointsArr.length}`);

  // if (allGazepointsArr.length) {
  //   const fileFormatGroups = _.groupBy(allGazepointsArr, 'fileFormat');

  //   Object.keys(fileFormatGroups).forEach((fileFormat) => {
  //     const gazepointsArr = fileFormatGroups[fileFormat];

  //     let startIndex = 0;
  //     let number = 1;

  //     do {
  //       let endIndex;
  //       try {
  //         endIndex = this.getGlanceEndIndex({
  //           gazepoints: gazepointsArr,
  //           startIndex,
  //         });
  //         // console.log('start: ' + startIndex + ' end: ' + endIndex);
  //       } catch (err) {
  //         // console.log('start: ' + startIndex + ' end: ' + endIndex);
  //         if (err.error === 'minGlanceDurationNotMet') {
  //           // console.log(err.details);
  //           startIndex = err.details.nextIndex;
  //         } else {
  //           console.log(err);
  //         }
  //       }

  //       if (!endIndex) {
  //         continue;
  //       }

  //       try {
  //         // console.log('make the glance!');
  //         const glanceId = this.makeGlanceFromGazepoints({
  //           gazepoints: gazepointsArr,
  //           startIndex,
  //           endIndex,
  //           number: number++,
  //           participantId,
  //           stimulusId,
  //           fileFormat,
  //         });
  //         glanceIds.push(glanceId);
  //       } catch (err) {
  //         console.log(err);
  //       }

  //       startIndex = endIndex + 1;
  //     } while (startIndex < gazepointsArr.length - 1);
  //   });
  // }

  // return glanceIds;
}
