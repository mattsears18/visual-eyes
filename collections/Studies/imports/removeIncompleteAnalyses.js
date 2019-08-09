import Analyses from '../../Analyses/Analyses';

export default function removeIncompleteAnayses() {
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
