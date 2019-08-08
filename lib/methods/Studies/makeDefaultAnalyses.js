import Studies from '../../../collections/Studies/Studies';

Meteor.methods({
  'studies.makeDefaultAnalyses'({ studyId }) {
    if (Meteor.isServer) {
      console.log('Meteor Method: studies.makeDefaultAnalyses()');

      check(studyId, String);
      // Remove old incomplete analyses
      console.log('Remove old incomplete analyses');

      Analyses.remove(
        {
          studyId: this._id,
          status: { $ne: 'processed' },
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        },
      );

      const study = Studies.findOne({ _id: studyId });
      study.makeDefaultAnalysesThatDontExist();
    }
  },
});
