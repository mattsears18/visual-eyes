import { start } from 'repl';
import Participants from '../../Participants/Participants';

export default function makeVisits(opts) {
  if (Meteor.isServer) console.log('Analyses.makeVisits()');

  const { participantId } = opts || {};
  const { eyeevents } = opts || {};

  if (!eyeevents || !eyeevents.length) {
    throw new Error('noEyeevents');
  }

  if (!participantId) {
    throw new Error('noParticipantId');
  }

  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  // Filter the fixations by minimum duration
  // TODO FUTURE - handle blinks and saccades
  const allFixations = this.filterFixationsByDuration(
    eyeevents,
    this.minFixationDuration,
  );

  const visitIds = [];

  let startIndex = 0;
  let number = 0;

  console.log(`startIndex: ${startIndex}`);

  do {
    let endIndex = null;
    console.log(`endIndex: ${endIndex}`);
    try {
      console.log('try to get endIndex');
      endIndex = this.getVisitEndIndex({
        allFixations,
        startIndex,
      });

      console.log(`endIndex: ${endIndex}`);

      if (endIndex && allFixations[endIndex]) {
        try {
          number += 1;

          console.log('make a visit!');
          console.log(`number: ${number}, [${startIndex}:${endIndex}]`);

          const { timestamp } = allFixations[startIndex];
          const duration = allFixations[endIndex].timestamp
            + allFixations[endIndex].duration
            - allFixations[startIndex].timestamp;

          const visitId = Visits.insert({
            studyId: this.studyId,
            analysisId: this._id,
            participantId,
            aoiId: allFixations[startIndex].aoiId,
            stimulusId: allFixations[startIndex].stimulusId,
            number,
            timestamp,
            duration,
          });

          visitIds.push(visitId);
          console.log(`visit number: ${number} created!`);
          console.log(`endIndex: ${endIndex} nextStartIndex: ${startIndex}`);
        } catch (err) {
          console.log(err);
        }
      }

      startIndex = endIndex + 1;
    } catch (err) {
      console.log('no visit generated');
      if (
        err.error === 'minVisitDurationNotMet'
        || err.error === 'endIndexNotFound'
      ) {
        console.log(err.details);
        startIndex = err.details.nextIndex;
        console.log(`endIndex: ${endIndex} nextStartIndex: ${startIndex}`);
      } else if (err.error === 'noStimulusFound') {
        console.log(
          'stimulus not found - need to delete all eyeevents and gazepoints with this stimulusId',
        );
      } else {
        console.log(err);
      }
    }
  } while (startIndex < eyeevents.length - 1);

  return visitIds;
}
