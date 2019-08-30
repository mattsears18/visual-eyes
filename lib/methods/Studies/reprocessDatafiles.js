import Studies from '../../../collections/Studies/Studies';

Meteor.methods({
  'studies.reprocessDatafiles'({ studyId }) {
    if (Meteor.isServer) {
      console.log('Meteor Method: studies.reprocessDatafiles()');
    }
    // this method is only necessary to allow a user to manually
    // reprocess the analyses (from the client)
    check(studyId, String);
    const study = Studies.findOne({ _id: studyId });
    if (study) study.reprocessDatafiles();
  },
});
