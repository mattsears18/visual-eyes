export default function removeIncompleteAnayses() {
  // // this can only be called from the server
  if (Meteor.isServer) {
    console.log('study.removeIncompleteAnalyses()');

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
  }
}
