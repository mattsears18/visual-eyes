import Participants from '../../Participants/Participants';
import Gazepoints from '../../Gazepoints/Gazepoints';

export default function makeGlances({ participantId, points }) {
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

  const allGazepoints = points
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

  const glanceIds = [];

  console.log(
    `participantId: ${participantId}, total gazepoint count: ${
      allGazepoints.length
    }`,
  );

  if (allGazepoints.length) {
    const fileFormatGroups = _.groupBy(allGazepoints, 'fileFormat');
    Object.keys(fileFormatGroups).forEach((fileFormat) => {
      const gazepoints = fileFormatGroups[fileFormat];
      let startIndex = 0;
      let number = 1;

      do {
        let endIndex = null;
        try {
          endIndex = this.getGlanceEndIndex({
            gazepoints,
            startIndex,
          });
          console.log(`startIndex: ${startIndex} endIndex: ${endIndex}`);

          if (endIndex) {
            try {
              console.log('make the glance!');
              number += 1;
              const glanceId = '555';

              // const glanceId = this.makeGlanceFromGazepoints({
              //   gazepoints: gazepoints,
              //   startIndex,
              //   endIndex,
              //   number: (number += 1),
              //   participantId,
              //   stimulusId,
              //   fileFormat,
              // });

              glanceIds.push(glanceId);
              console.log(`glance number: ${number} created!`);
              startIndex = endIndex + 1;
              console.log(
                `endIndex: ${endIndex} nextStartIndex: ${startIndex}`,
              );
            } catch (err) {
              console.log(err);
            }
          }
        } catch (err) {
          console.log('no glance generated');
          if (err.error === 'minGlanceDurationNotMet') {
            // console.log(err.details);
            startIndex = err.details.nextIndex;
            console.log(`endIndex: ${endIndex} nextStartIndex: ${startIndex}`);
          } else {
            console.log(err);
          }
        }
      } while (startIndex < gazepoints.length - 1);
    });
  }

  return glanceIds;
}
