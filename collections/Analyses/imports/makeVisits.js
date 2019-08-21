import Participants from '../../Participants/Participants';
import Gazepoints from '../../Gazepoints/Gazepoints';

export default function makeVisits({ participantId, points }) {
  const visitIds = [];

  if (!participantId) {
    throw new Error('noParticipantId');
  }

  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  if (!points || !points.length) {
    throw new Error('noPoints!');
  }

  const allGazepoints = points.slice()
    || Gazepoints.find(
      { participantId },
      {
        fields: {
          _id: 1,
          fileFormat: 1,
          stimulusId: 1,
          timestamp: 1,
          x: 1,
          y: 1,
          fixationIndex: 1,
          category: 1,
        },
        sort: { timestamp: 1 },
      },
    ).fetch();

  console.log(
    `participantId: ${participantId}, total gazepoint count: ${allGazepoints.length}`,
  );

  if (allGazepoints.length) {
    const fileFormatGroups = _.groupBy(allGazepoints, 'fileFormat');
    Object.keys(fileFormatGroups).forEach((fileFormat) => {
      const gazepoints = fileFormatGroups[fileFormat];
      let startIndex = 0;
      let number = 0;

      do {
        let endIndex = null;
        try {
          endIndex = this.getVisitEndIndex({
            gazepoints,
            startIndex,
          });

          if (endIndex && gazepoints[endIndex]) {
            try {
              number += 1;
              console.log(
                `Save visit. Number: ${number} [${startIndex} : ${endIndex}] (Duration: ${gazepoints[
                  endIndex
                ].timestamp - gazepoints[startIndex].timestamp}ms)`,
              );

              const visitId = this.makeVisitFromGazepoints({
                gazepoints,
                startIndex,
                endIndex,
                number,
                participantId,
                stimulusId: gazepoints[startIndex].stimulusId,
                fileFormat,
              });

              visitIds.push(visitId);
              // console.log(`visit number: ${number} created!`);

              // console.log(
              //   `endIndex: ${endIndex} nextStartIndex: ${startIndex}`,
              // );
            } catch (err) {
              console.log(err);
            }
          }

          startIndex = endIndex + 1;
        } catch (err) {
          // console.log('no visit generated');
          if (err.error === 'minVisitDurationNotMet') {
            // console.log(err.details);
            startIndex = err.details.nextIndex;
            // console.log(`endIndex: ${endIndex} nextStartIndex: ${startIndex}`);
          } else if (err.error === 'noStimulusFound') {
            console.log(
              'stimulus not found - delete all gazepoints with this stimulusId',
            );
          } else {
            console.log(err);
          }
        }
      } while (startIndex < gazepoints.length - 1);
    });
  }

  return visitIds;
}
