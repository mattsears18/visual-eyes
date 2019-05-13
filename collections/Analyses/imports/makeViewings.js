export default function makeViewings({
  participantId,
  stimulusId,
}) {
  if (!participantId) { throw new Error('noParticipantId'); }
  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  if (!stimulusId) { throw new Error('noStimulusId'); }
  const stimulus = Stimuli.findOne({ _id: stimulusId });
  if (!stimulus) {
    throw new Error('noStimulusFound');
  }

  const search = { participantId, stimulusId };

  if (this.ignoreOutsideImage) {
    if (stimulus.width) {
      search.x = { $gte: 0, $lte: stimulus.width };
    } else {
      search.x = { $gte: 0 };
    }

    if (stimulus.height) {
      search.y = { $gte: 0, $lte: stimulus.height };
    } else {
      search.y = { $gte: 0 };
    }
  }

  // console.log('participant: ' + participant.name + ' stimulus: ' + stimulus.name);

  const gazepoints = Gazepoints.find(search, { sort: { timestamp: 1 } });
  const gazepointsArr = gazepoints.fetch();
  const viewingIds = [];

  // console.log('gazepoint count: ' + gazepointsArr.length);

  if (gazepointsArr.length) {
    let startIndex = 0;
    let number = 1;

    do {
      let endIndex;
      try {
        endIndex = this.getViewingEndIndex({
          gazepoints: gazepointsArr,
          startIndex,
        });
        // console.log('start: ' + startIndex + ' end: ' + endIndex);
      } catch (err) {
        // console.log('start: ' + startIndex + ' end: ' + endIndex);
        if (err.error == 'minViewingTimeNotMet') {
          // console.log(err.details);
          startIndex = err.details.nextIndex;
        } else {
          console.log(err);
        }
      }

      if (!endIndex) {
        continue;
      }

      try {
        // console.log('make the viewing!');
        const viewingId = this.makeViewingFromGazepoints({
          gazepoints: gazepointsArr,
          startIndex,
          endIndex,
          number: number++,
          participantId,
          stimulusId,
        });
        viewingIds.push(viewingId);
      } catch (err) {
        console.log(err);
      }

      startIndex = endIndex + 1;
    } while (startIndex < gazepointsArr.length - 1);
  }

  return viewingIds;
}
