import Datafiles from '../collections/Datafiles/Datafiles';
import Studies from '../collections/Studies/Studies';
import Stimulusfiles from '../collections/Stimuli/Stimulusfiles/Stimulusfiles';
import Variablefiles from '../collections/Variablefiles/Variablefiles';
import Analyses from '../collections/Analyses/Analyses';
import Stimuli from '../collections/Stimuli/Stimuli';
import Aois from '../collections/Aois/Aois';
import Gazepoints from '../collections/Gazepoints/Gazepoints';
import Participants from '../collections/Participants/Participants';
import Visits from '../collections/Visits/Visits';
import Variables from '../collections/Variables/Variables';

export default function dbCleanup() {
  if (Meteor.isServer) {
    const validStudyIds = Studies.find({}, { fields: { _id: 1 } })
      .fetch()
      .map(doc => doc._id);

    // //////////////////////////////////////////////////////////////////////////////
    let query = { studyId: { $nin: validStudyIds } };
    if (Datafiles.find(query).count()) {
      console.log('removing orphaned Datafiles...');
      Datafiles.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Datafiles removed.`);
        }
      });
    }

    const validDatafileIds = Datafiles.find({}, { fields: { _id: 1 } })
      .fetch()
      .map(doc => doc._id);

    // //////////////////////////////////////////////////////////////////////////////
    query = { 'meta.studyId': { $nin: validStudyIds } };
    if (Stimulusfiles.find(query).count()) {
      console.log('removing orphaned Stimulusfiles...');
      Stimulusfiles.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Stimulusfiles removed.`);
        }
      });
    }

    // //////////////////////////////////////////////////////////////////////////////
    query = { studyId: { $nin: validStudyIds } };
    if (Stimuli.find(query).count()) {
      console.log('removing orphaned Stimuli...');
      Stimuli.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Stimuli removed.`);
        }
      });
    }

    const validStimulusIds = Stimuli.find({}, { fields: { _id: 1 } })
      .fetch()
      .map(doc => doc._id);

    // //////////////////////////////////////////////////////////////////////////////
    query = { studyId: { $nin: validStudyIds } };
    if (Participants.find(query).count()) {
      console.log('removing orphaned Participants...');
      Participants.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Participants removed.`);
        }
      });
    }

    const validParticipantIds = Participants.find({}, { fields: { _id: 1 } })
      .fetch()
      .map(doc => doc._id);

    // //////////////////////////////////////////////////////////////////////////////
    query = { stimulusId: { $nin: validStimulusIds } };
    if (Aois.find(query).count()) {
      console.log('removing orphaned Aois...');
      Aois.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Aois removed.`);
        }
      });
    }

    const validAoiIds = Aois.find({}, { fields: { _id: 1 } })
      .fetch()
      .map(doc => doc._id);

    // //////////////////////////////////////////////////////////////////////////////
    query = { studyId: { $nin: validStudyIds } };
    if (Variablefiles.find(query).count()) {
      console.log('removing orphaned Variablefiles...');
      Variablefiles.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Variablefiles removed.`);
        }
      });
    }

    // //////////////////////////////////////////////////////////////////////////////
    query = { studyId: { $nin: validStudyIds } };
    if (Variables.find(query).count()) {
      console.log('removing orphaned Variables...');
      Variables.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Variables removed.`);
        }
      });
    }

    // //////////////////////////////////////////////////////////////////////////////
    query = { studyId: { $nin: validStudyIds } };
    if (Analyses.find(query).count()) {
      console.log('removing orphaned Analyses...');
      Analyses.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Analyses removed.`);
        }
      });
    }

    const validAnalysisIds = Analyses.find({}, { fields: { _id: 1 } })
      .fetch()
      .map(doc => doc._id);

    // //////////////////////////////////////////////////////////////////////////////
    query = {
      $or: [
        { datafileId: { $nin: validDatafileIds } },
        { stimulusId: { $nin: validStimulusIds } },
        { participantId: { $nin: validParticipantIds } },
      ],
    };
    if (Gazepoints.find(query).count()) {
      console.log('removing orphaned Gazepoints...');
      Gazepoints.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Gazepoints removed.`);
        }
      });
    }

    // //////////////////////////////////////////////////////////////////////////////
    query = {
      $or: [
        { studyId: { $nin: validStudyIds } },
        { analysisId: { $nin: validAnalysisIds } },
        { stimulusId: { $nin: validStimulusIds } },
        { participantId: { $nin: validParticipantIds } },
      ],
    };
    if (Visits.find(query).count()) {
      console.log('removing orphaned Visits...');
      Visits.remove(query, (err, num) => {
        if (err && err.error !== 404) {
          console.log(err);
        }
        if (num) {
          console.log(`${num} orphaned Visits removed.`);
        }
      });
    }

    console.log('finished cleaning database');
  }
}
