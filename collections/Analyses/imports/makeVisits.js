import Participants from '../../Participants/Participants';
import Gazepoints from '../../Gazepoints/Gazepoints';

export default function makeVisits(opts) {
  const { participantId } = opts || {};
  const { fixations } = opts || {};

  if (!fixations || !fixations.length) {
    throw new Error('noFixations');
  }

  const allFixations = fixations.slice();

  if (!participantId) {
    throw new Error('noParticipantId');
  }

  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  const visitIds = [];

  let startIndex = 0;
  let number = 0;

  do {
    let endIndex = null;
    try {
      endIndex = this.getVisitEndIndex({
        fixations: allFixations,
        startIndex,
      });

      if (endIndex && allFixations[endIndex]) {
        try {
          number += 1;

          const visitId = this.makeVisit({
            fixations: allFixations,
            startIndex,
            endIndex,
            number,
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
      if (
        err.error === 'minVisitDurationNotMet'
        || err.error === 'endIndexNotFound'
      ) {
        // console.log(err.details);
        startIndex = err.details.nextIndex;
        // console.log(`endIndex: ${endIndex} nextStartIndex: ${startIndex}`);
      } else if (err.error === 'noStimulusFound') {
        console.log(
          'stimulus not found - need to delete all eyeevents and gazepoints with this stimulusId',
        );
      } else {
        console.log(err);
      }
    }
  } while (startIndex < allFixations.length - 1);

  return visitIds;
}
