import { start } from 'repl';
import Participants from '../../Participants/Participants';

export default function makeVisits(opts) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Analyses.makeVisits()');

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

  do {
    let endIndex = null;

    try {
      // console.log('try to get endIndex');
      // console.log(`startIndex: ${startIndex}`);
      endIndex = this.getVisitEndIndex({
        fixations: allFixations,
        startIndex,
      });

      // console.log(`endIndex: ${endIndex}`);

      if (endIndex && allFixations[endIndex]) {
        const { timestamp } = allFixations[startIndex];
        const duration = allFixations[endIndex].timestamp
          + allFixations[endIndex].duration
          - allFixations[startIndex].timestamp;

        if (duration >= this.minVisitDuration) {
          try {
            number += 1;

            if (Meteor.isServer && !Meteor.isTest) {
              console.log(
                `make a visit! number: ${number}, [${startIndex}:${endIndex}]`,
              );
            }

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
            startIndex = endIndex + 1;

            // console.log(`endIndex: ${endIndex} nextStartIndex: ${startIndex}`);
          } catch (err) {
            if (Meteor.isServer && !Meteor.isTest) console.log(err);
          }
        }
      }

      startIndex = endIndex + 1;
    } catch (err) {
      // console.log('no visit generated');
      // console.log(err.message);

      if (
        err.message === 'minVisitDurationNotMet'
        || err.message === 'endIndexNotFound'
        || err.message === 'blankInitialStimulus'
      ) {
        startIndex += 1;
      } else if (err.message === 'noStimulusFound') {
        if (Meteor.isServer && !Meteor.isTest) console.log('stimulus not found!');
      } else {
        console.log(err);
      }
    }
  } while (startIndex < allFixations.length - 1);

  return visitIds;
}
