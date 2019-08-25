export default function generateEyeevents(assignedRows) {
  // assume rows have already been sorted by timestamp
  // assume all rows belong to same stimulus

  if (!assignedRows || !assignedRows.length) {
    throw Error('noAssignedRows');
  }

  const rows = [...assignedRows];

  console.log(rows[0]);

  const saccades = []; // FUTURE!!
  const blinks = []; // FUTURE!!
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

    console.log('     ');

    if (lastEvent === 'fixation') {
      if (rows[i] && currentFixation) {
        console.log(`${rows[i].timestamp} end fixation`);

        currentFixation.duration = rows[i].timestamp - currentFixation.timestamp;
        fixations.push(currentFixation);

        currentFixation = null;
      }
    } else if (lastEvent === 'saccade') {
      if (rows[i - 1] && currentSaccade) {
        console.log(`${rows[i - 1].timestamp} end saccade`);

        currentSaccade.duration = rows[i - 1].timestamp - currentSaccade.timestamp;
        saccades.push(currentSaccade);

        currentSaccade = null;
      }
    } else if (lastEvent === 'blink') {
      if (rows[i] && currentBlink) {
        console.log(`${rows[i].timestamp} end blink`);

        currentBlink.duration = rows[i].timestamp - currentBlink.timestamp;
        blinks.push(currentBlink);

        currentBlink = null;
      }
    }
  }

  for (let i = 0; i < rows.length; i += 1) {
    console.log(
      `     i: ${i} of ${rows.length
        - 1}   lastEvent: ${lastEvent} current category: ${
        rows[i].category
      } timestamp: ${rows[i].timestamp}`,
    );
    switch (rows[i].category) {
      case 'Visual Intake':
        if (lastEvent && lastEvent !== 'fixation') {
          terminateLastEvent(i);
        }

        gazepoints.push(rows[i]);
        if (rows[i].eventIndex) {
          if (
            !currentFixation
            || currentFixation.index !== rows[i].eventIndex
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
              index: rows[i].eventIndex,
              x: this.fileFormat === 'imotions' ? rows[i].fixationX : rows[i].x,
              y: this.fileFormat === 'imotions' ? rows[i].fixationY : rows[i].y,
              duration:
                this.fileFormat === 'imotions' ? rows[i].fixationDuration : 0,
            };

            console.log(`${currentFixation.timestamp} begin fixation`);
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
          if (!currentSaccade || currentSaccade.index !== rows[i].eventIndex) {
            // new saccade!
            if (currentSaccade) {
              terminateLastEvent(i);
            }

            currentSaccade = {
              timestamp: rows[i].timestamp,
              index: rows[i].eventIndex,
              x: rows[i].x,
              y: rows[i].y,
              duration: 0,
            };

            console.log(`${currentSaccade.timestamp} begin saccade`);
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
          if (!currentBlink || currentBlink.index !== rows[i].eventIndex) {
            // new saccade!
            if (currentBlink) {
              terminateLastEvent(i);
            }

            currentBlink = {
              timestamp: rows[i].timestamp,
              index: rows[i].eventIndex,
              x: rows[i].x,
              y: rows[i].y,
              duration: 0,
            };

            console.log(`${currentBlink.timestamp} begin blink`);
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
