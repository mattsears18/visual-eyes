import Jobs from '../../Jobs/Jobs';
import Datafiles from '../../Datafiles/Datafiles';

export default function reprocessDatafiles() {
  if (Meteor.isServer) {
    console.log(`Study.reprocessDatafiles() studyId: ${this._id}`);

    const datafiles = Datafiles.find({ studyId: this._id }).fetch();

    Jobs.remove({
      type: 'datafiles.process',
      'data.datafileId': { $in: datafiles.map(d => d._id) },
    });

    this.datafiles().forEach((datafile) => {
      Datafiles.update(
        { _id: datafile._id },
        {
          $set: {
            status: 'needsProcessing',
          },
          $unset: {
            headersRemoved: 1,
            fileFormat: 1,
            rawRowCount: 1,
            integerRowCount: 1,
            gazepointCount: 1,
            fixationCount: 1,
          },
        },
      );
      datafile.makeProcessJob();
    });
  }
}
