import Jobs from '../../Jobs/Jobs';

export default function makeGazeJobs() {
  // console.log('analysis.makeGazeJobs() analysisId: ' + this._id);
  this.status = 'processing';
  Analyses.update(
    { _id: this._id },
    { $set: { status: 'processing', gazeCount: undefined } }
  );

  try {
    Meteor.call('analyses.removeGazes', { analysisId: this._id });
    Meteor.call('analyses.removeJobs', { analysisId: this._id });
  } catch (err) {
    // console.log(err);
  }

  this.participantIds.forEach(participantId => {
    const participant = Participants.findOne({ _id: participantId });
    if (!participant) {
      console.log(`no participant found: ${participantId}`);
      Analyses.update(
        { _id: this._id },
        { $pull: { participantIds: participantId } }
      );
      return;
    }

    this.stimulusIds.forEach(stimulusId => {
      const stimulus = Stimuli.findOne({ _id: stimulusId });
      if (!stimulus) {
        console.log(`no stimulus found: ${stimulusId}`);
        Analyses.update(
          { _id: this._id },
          { $pull: { stimulusIds: stimulusId } }
        );
        return;
      }

      // console.log('make job for this._id: ' + this._id + ', participantId: ' + participantId + ', stimulusId: ' + stimulusId);
      const job = new Job(Jobs, 'analyses.makeGazes', {
        analysisId: this._id,
        participantId,
        stimulusId
      });

      job
        .priority('normal')
        .retry({
          retries: Jobs.forever,
          wait: 1000,
          backoff: 'constant' // wait constant amount of time between each retry
        })
        .save();
    });
  });
}
