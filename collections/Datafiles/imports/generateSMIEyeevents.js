export default function generateSMIEyeevents(assignedRows) {
  // assume rows have already been sorted by timestamp
  // assume all rows belong to same stimulus

  if (!assignedRows || !assignedRows.length) {
    throw Error('noAssignedRows');
  }

  const rows = [...assignedRows];

  const saccades = [];
  const blinks = [];
  const gazepoints = [];
  const fixations = [];

  const events = [];
  let lastEvent;

  const lastAoiId = '';

  let currentFixation;
  let currentSaccade;
  let currentBlink;

  function terminateLastEvent(nextEventIndex) {
    const i = nextEventIndex;

    // console.log('     ');

    if (lastEvent === 'fixation') {
      if (rows[i] && currentFixation) {
        // console.log(`${rows[i].timestamp} end fixation`);

        currentFixation.duration = rows[i].timestamp - currentFixation.timestamp;
        currentFixation.timestampEnd = currentFixation.timestamp + currentFixation.duration;
        fixations.push(currentFixation);

        currentFixation = null;
      }
    } else if (lastEvent === 'saccade') {
      if (rows[i - 1] && currentSaccade) {
        // console.log(`${rows[i - 1].timestamp} end saccade`);

        currentSaccade.duration = rows[i - 1].timestamp - currentSaccade.timestamp;
        currentSaccade.timestampEnd = currentSaccade.timestamp + currentSaccade.duration;
        saccades.push(currentSaccade);

        // TODO need to save fromAoiId and toAoiId

        currentSaccade = null;
      }
    } else if (lastEvent === 'blink') {
      if (rows[i] && currentBlink) {
        // console.log(`${rows[i].timestamp} end blink`);

        currentBlink.duration = rows[i].timestamp - currentBlink.timestamp;
        currentBlink.timestampEnd = currentBlink.timestamp + currentBlink.duration;
        blinks.push(currentBlink);

        currentBlink = null;
      }
    }
  }

  for (let i = 0; i < rows.length; i += 1) {
    switch (rows[i].category) {
      case 'Visual Intake':
        if (lastEvent && lastEvent !== 'fixation') {
          terminateLastEvent(i);
        }

        gazepoints.push({
          timestamp: rows[i].timestamp,
          fixationIndex: rows[i].eventIndex,
          x: rows[i].x,
          y: rows[i].y,
          aoiId: rows[i].aoiId,
        });

        if (rows[i].eventIndex) {
          if (
            !currentFixation
            || currentFixation.eventIndex !== rows[i].eventIndex
          ) {
            // new fixation!
            if (currentFixation) {
              terminateLastEvent(i);
            }

            // SMI
            // Fixation begins on the timestamp of the previous row if previous event was saccade
            // Fixation begins on the timestamp of its first row if previous event was blink

            currentFixation = {
              timestamp:
                lastEvent === 'saccade'
                  ? rows[i - 1].timestamp
                  : rows[i].timestamp,
              eventIndex: rows[i].eventIndex,
              x: rows[i].x,
              y: rows[i].y,
              duration: 0,
              aoiId: rows[i].aoiId,
            };

            // console.log(`${currentFixation.timestamp} begin fixation`);
          }
        }

        if (lastEvent !== 'fixation') {
          lastEvent = 'fixation';
          events.push(lastEvent);
        }

        break;
      case 'Saccade':
        if (lastEvent && lastEvent !== 'saccade') {
          terminateLastEvent(i);
        }

        if (rows[i].eventIndex) {
          if (
            !currentSaccade
            || currentSaccade.eventIndex !== rows[i].eventIndex
          ) {
            // new saccade!
            if (currentSaccade) {
              terminateLastEvent(i);
            }

            currentSaccade = {
              timestamp: rows[i].timestamp,
              eventIndex: rows[i].eventIndex,
              x: rows[i].x,
              y: rows[i].y,
              duration: 0,
              // fromAoiId: 'todo',
              // toAoiId: 'todo',
              // TODO
            };

            // console.log(`${currentSaccade.timestamp} begin saccade`);
          }
        }

        lastEvent = 'saccade';
        events.push(lastEvent);
        break;
      case 'Blink':
        if (lastEvent && lastEvent !== 'blink') {
          terminateLastEvent(i);
        }

        if (rows[i].eventIndex) {
          if (!currentBlink || currentBlink.eventIndex !== rows[i].eventIndex) {
            // new saccade!
            if (currentBlink) {
              terminateLastEvent(i);
            }

            currentBlink = {
              timestamp: rows[i].timestamp,
              eventIndex: rows[i].eventIndex,
              x: rows[i].x,
              y: rows[i].y,
              duration: 0,
              aoiId: rows[i].aoiId,
            };

            // console.log(`${currentBlink.timestamp} begin blink`);
          }
        }

        lastEvent = 'blink';
        events.push(lastEvent);
        break;
      case 'User Event':
        lastEvent = 'userEvent';
        events.push(lastEvent);
        break;
      case '-':
        // if (lastEvent === 'fixation' && currentFixation) {
        //   terminateLastEvent(i);
        // }
        break;

      default:
        console.log('invalid recorded row category');
        console.log(rows[i]);
    }
  }

  terminateLastEvent(rows.length - 1);

  return {
    saccades,
    blinks,
    gazepoints,
    fixations,
  };
}
