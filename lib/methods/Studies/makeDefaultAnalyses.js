import Studies from '../../../collections/Studies/Studies';

Meteor.methods({
  'studies.makeDefaultAnalyses'({ studyId }) {
    if (Meteor.isServer) {
      console.log('Meteor Method: studies.makeDefaultAnalyses()');

      check(studyId, String);
      const study = Studies.findOne({ _id: studyId });

      const num = study.removeIncompleteAnalyses();

      study.makeDefaultAnalysesThatDontExist();
    }
  },
});
