import Participants from '../../Participants/Participants';
import Stimuli from '../../Stimuli/Stimuli';
import Gazepoints from '../../Gazepoints/Gazepoints';

export default function makeGlances({ participantId, stimulusId }) {
  if (!participantId) {
    throw new Error('noParticipantId');
  }

  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  let stimulus;
  if (this.type === 'custom') {
    if (!stimulusId) {
      throw new Error('noStimulusId');
    }
    stimulus = Stimuli.findOne({ _id: stimulusId });
    if (!stimulus) {
      throw new Error('noStimulusFound');
    }
  }

  const search = { participantId };
  if (stimulus) {
    search.stimulusId = stimulusId;
  }

  if (stimulus) {
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
  }

  // console.log('participant: ' + participant.name + ' stimulus: ' + stimulus.name);

  const allGazepoints = Gazepoints.find(search, {
    fields: {
      _id: 1,
      fileFormat: 1,
      timestamp: 1,
      aoiId: 1,
      x: 1,
      y: 1,
      fixationIndex: 1,
      category: 1,
    },
    sort: { timestamp: 1 },
  });
  const allGazepointsArr = allGazepoints.fetch();
  const glanceIds = [];

  console.log(`gazepoint count: ${allGazepointsArr.length}`);
  console.log('pick back up here!');
  // TODO pick back up here

  if (allGazepointsArr.length) {
    const fileFormatGroups = _.groupBy(allGazepointsArr, 'fileFormat');
    Object.keys(fileFormatGroups).forEach((fileFormat) => {
      const gazepointsArr = fileFormatGroups[fileFormat];
      let startIndex = 0;
      let number = 1;
      do {
        let endIndex;
        try {
          endIndex = this.getGlanceEndIndex({
            gazepoints: gazepointsArr,
            startIndex,
          });
        } catch (err) {
          if (err.error === 'minGlanceDurationNotMet') {
            console.log(err.details);
            startIndex = err.details.nextIndex;
          } else {
            console.log(err);
          }
        } finally {
          console.log(`start: ${startIndex} end: ${endIndex}`);
        }

        if (endIndex) {
          try {
            console.log('make the glance!');
            const glanceId = this.makeGlanceFromGazepoints({
              gazepoints: gazepointsArr,
              startIndex,
              endIndex,
              number: (number += 1),
              participantId,
              stimulusId,
              fileFormat,
            });
            glanceIds.push(glanceId);
          } catch (err) {
            console.log(err);
          }
        }

        startIndex = endIndex + 1;
      } while (startIndex < gazepointsArr.length - 1);
    });
  }

  return glanceIds;
}
