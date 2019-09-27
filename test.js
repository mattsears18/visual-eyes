import { ifError } from 'assert';

const visits = Visits.find().fetch();

visits.forEach((visit) => {
  if (!visit.getGlanceSaccade()) {
    console.log(`no glance saccade. visit number: ${visit.number}`);
  }
});
