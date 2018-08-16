import Recordings from './Recordings';

Recordings.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});
