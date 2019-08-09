import Datafiles from '../collections/Datafiles/Datafiles';
import Studies from '../collections/Studies/Studies';
import Stimulusfiles from '../collections/Stimuli/Stimulusfiles/Stimulusfiles';
import Variablefiles from '../collections/Variablefiles/Variablefiles';
import Analyses from '../collections/Analyses/Analyses';
import Stimuli from '../collections/Stimuli/Stimuli';
import Aois from '../collections/Aois/Aois';
import Gazepoints from '../collections/Gazepoints/Gazepoints';
import Participants from '../collections/Participants/Participants';
import Glances from '../collections/Glances/Glances';
import Variables from '../collections/Variables/Variables';

export default function dbCleanup() {
  const validStudyIds = Studies.find({}, { fields: { _id: 1 } })
    .fetch()
    .map(doc => doc._id);

  Datafiles.remove({ studyId: { $nin: validStudyIds } }, (err, num) => {
    if (err && err.error !== 404) {
      console.log(err);
    }
    if (num) {
      console.log(`${num} orphaned Datafiles removed.`);
    }
  });

  const validDatafileIds = Datafiles.find({}, { fields: { _id: 1 } })
    .fetch()
    .map(doc => doc._id);

  Stimulusfiles.remove(
    { 'meta.studyId': { $nin: validStudyIds } },
    (err, num) => {
      if (err && err.error !== 404) {
        console.log(err);
      }
      if (num) {
        console.log(`${num} orphaned Stimulusfiles removed.`);
      }
    },
  );

  const validStimulusfileIds = Stimulusfiles.find({}, { fields: { _id: 1 } })
    .fetch()
    .map(doc => doc._id);

  Stimuli.remove(
    { stimulusfileId: { $nin: validStimulusfileIds } },
    (err, num) => {
      if (err && err.error !== 404) {
        console.log(err);
      }
      if (num) {
        console.log(`${num} orphaned Stimuli removed.`);
      }
    },
  );

  const validStimulusIds = Stimuli.find({}, { fields: { _id: 1 } })
    .fetch()
    .map(doc => doc._id);

  Participants.remove({ studyId: { $nin: validStudyIds } }, (err, num) => {
    if (err && err.error !== 404) {
      console.log(err);
    }
    if (num) {
      console.log(`${num} orphaned Participants removed.`);
    }
  });

  const validParticipantIds = Participants.find({}, { fields: { _id: 1 } })
    .fetch()
    .map(doc => doc._id);

  Aois.remove({ stimulusId: { $nin: validStimulusIds } }, (err, num) => {
    if (err && err.error !== 404) {
      console.log(err);
    }
    if (num) {
      console.log(`${num} orphaned Aois removed.`);
    }
  });

  const validAoiIds = Aois.find({}, { fields: { _id: 1 } })
    .fetch()
    .map(doc => doc._id);

  Variablefiles.remove({ studyId: { $nin: validStudyIds } }, (err, num) => {
    if (err && err.error !== 404) {
      console.log(err);
    }
    if (num) {
      console.log(`${num} orphaned Variablefiles removed.`);
    }
  });

  Variables.remove({ studyId: { $nin: validStudyIds } }, (err, num) => {
    if (err && err.error !== 404) {
      console.log(err);
    }
    if (num) {
      console.log(`${num} orphaned Variables removed.`);
    }
  });

  Analyses.remove({ studyId: { $nin: validStudyIds } }, (err, num) => {
    if (err && err.error !== 404) {
      console.log(err);
    }
    if (num) {
      console.log(`${num} orphaned Analyses removed.`);
    }
  });

  const validAnalysisIds = Analyses.find({}, { fields: { _id: 1 } })
    .fetch()
    .map(doc => doc._id);

  Gazepoints.remove(
    {
      $or: [
        { datafileId: { $nin: validDatafileIds } },
        { stimulusId: { $nin: validStimulusIds } },
        { participantId: { $nin: validParticipantIds } },
      ],
    },
    (err, num) => {
      if (err && err.error !== 404) {
        console.log(err);
      }
      if (num) {
        console.log(`${num} orphaned Gazepoints removed.`);
      }
    },
  );

  Glances.remove(
    {
      $or: [
        { studyId: { $nin: validStudyIds } },
        { analysisId: { $nin: validAnalysisIds } },
        { stimulusId: { $nin: validStimulusIds } },
        { participantId: { $nin: validParticipantIds } },
      ],
    },
    (err, num) => {
      if (err && err.error !== 404) {
        console.log(err);
      }
      if (num) {
        console.log(`${num} orphaned Glances removed.`);
      }
    },
  );

  // Analyses.remove({ studyId: { $nin: validStudyIds } }, (err, num) => {
  //   if (err && err.error !== 404) {
  //     console.log(err);
  //   }
  //   if (num) {
  //     console.log(`${num} orphaned Analyses removed.`);
  //   }
  // });
  //
}
