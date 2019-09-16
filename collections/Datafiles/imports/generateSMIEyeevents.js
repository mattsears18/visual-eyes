import { jStat } from 'jStat';

export default function generateSMIEyeevents(sortedRows) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.generateSMIEyeevents()');

  if (!sortedRows || !sortedRows.length) {
    throw Error('noData');
  }

  const eventTypes = ['Visual Intake', 'Saccade', 'Blink'];

  const rows = sortedRows.filter(
    row => row.eventIndex >= 0 && eventTypes.includes(row.category),
  );

  const events = [];
  let currentEvent;

  for (let i = 0; i < rows.length; i += 1) {
    if (
      !currentEvent
      || rows[i].category !== currentEvent.category
      // || rows[i].stimulusId !== currentEvent.stimulusId
      // || rows[i].aoiId !== currentEvent.aoiId
      || rows[i].eventIndex !== currentEvent.eventIndex
    ) {
      // Category change
      if (currentEvent) {
        const event = terminateEvent(currentEvent, rows[i - 1]);
        events.push(event);
      }

      currentEvent = startEvent(rows[i], events);
    } else {
      currentEvent.xs.push(rows[i].x);
      currentEvent.ys.push(rows[i].y);
    }
  }

  if (currentEvent) {
    const event = terminateEvent(currentEvent, rows[rows.length - 1]);
    events.push(event);
  }

  return events;
}

function startEvent(row, events) {
  const newEvent = {
    timestamp: row.timestamp,
    combinedEventIndex: events.length + 1,
    category: row.category,
    eventIndex: row.eventIndex,
    xs: [row.x],
    ys: [row.y],
    stimulusId: row.stimulusId,
    aoiId: row.aoiId,
  };
  return newEvent;
}

function terminateEvent(event, row) {
  let type = event.category;
  if (type === 'Visual Intake') {
    type = 'Fixation';
  }

  const terminatedEvent = {
    ...event,
    type,
    xMean: parseInt(jStat.mean(event.xs), 10),
    yMean: parseInt(jStat.mean(event.ys), 10),
    duration: row.timestamp - event.timestamp,
  };

  delete terminatedEvent.category;

  return terminatedEvent;
}
