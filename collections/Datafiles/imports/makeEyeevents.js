import { Random } from 'meteor/random';
import Eyeevents from '../../Eyeevents/Eyeevents';

export default function makeEyeevents(renamedRows) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafile.makeEyeevents()');

  const validCoordinateRows = this.getValidCoordinatesOnly(renamedRows);
  const assignedRows = this.getAssignedRows(validCoordinateRows);
  const sortedRows = assignedRows.sort((a, b) => a.timestamp - b.timestamp);

  const bulkEvents = Eyeevents.rawCollection().initializeUnorderedBulkOp();

  const events = this.fileFormat === 'imotions'
    ? this.generateImotionsEyeevents(sortedRows)
    : this.generateSMIEyeevents(sortedRows);

  if (events.length) {
    events.forEach((event) => {
      bulkEvents.insert({
        ...event,
        _id: Random.id(),
        datafileId: this._id,
        studyId: this.studyId,
        participantId: this.participantId,
        timestampEnd:
          event.timestamp >= 0 && event.duration >= 0
            ? event.timestamp + event.duration
            : null,
      });
    });
  }

  return bulkEvents.execute(); // promise
}
