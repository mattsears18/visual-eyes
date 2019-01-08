import Participants from './Participants';

Participants.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});
