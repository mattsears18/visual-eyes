export default function getGlanceEndIndex({ gazepoints, startIndex = 0 }) {
  if (startIndex > gazepoints.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  let endIndex = parseInt(startIndex, 10);

  if (this.type === 'custom') {
    for (i = startIndex + 1; i < gazepoints.length - 1; i++) {
      // TODO pick back up here
      console.log('pick back up here');
      console.log('need to account for changing stimulusIds!!!!');

      if (
        gazepoints[i].timestamp - gazepoints[i - 1].timestamp
        > this.maxGlanceGapDuration
      ) {
        break;
      }
      endIndex++;
    }

    // console.log(
    //   `startTime: ${gazepoints[startIndex].timestamp} endTime: ${
    //     gazepoints[endIndex].timestamp
    //   } potential glance duration: ${gazepoints[endIndex].timestamp
    //     - gazepoints[startIndex].timestamp}`,
    // );
    // console.log(`minGlanceDuration: ${this.minGlanceDuration}`);

    if (
      gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp
      < this.minGlanceDuration
    ) {
      // console.log('min glance duration not met');
      throw new Meteor.Error('minGlanceDurationNotMet', null, {
        nextIndex: endIndex + 1,
      });
    }
  } else if (this.type === 'iso15007') {
    endIndex = startIndex + 100;
  }
  return endIndex;
}

// import { start } from 'repl';

// export default function getGlanceEndIndex({ gazepoints, startIndex = 0 }) {
//   console.log(this.type);

//   let endIndex;

//   if (this.type === 'custom') {
//     if (startIndex > gazepoints.length - 2) {
//       throw new Error('startIndexTooHigh');
//     }
//     const startTime = gazepoints[startIndex].timestamp;
//     let endIndex = parseInt(startIndex);

//     console.log(this.type);
//     for (let i = startIndex + 1; i < gazepoints.length; i += 1) {
//       if (
//         gazepoints[i].timestamp - gazepoints[i - 1].timestamp
//         > this.maxGlanceGapDuration
//       ) {
//         break;
//       }
//       endIndex++;
//     }
//     console.log(
//       `gazepoints length: ${
//         gazepoints.length
//       } startIndex: ${startIndex} endIndex: ${endIndex}`,
//     );
//     if (
//       gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp
//       < this.minGlanceDuration
//     ) {
//       throw new Meteor.Error('minGlanceDurationNotMet', null, {
//         nextIndex: endIndex + 1,
//       });
//     }
//   } else if (this.type === 'iso15007') {
//     // pick back up here
//     console.log('iso15007');
//     endIndex = Math.min(startIndex + 100, gazepoints.length + 2);
//   }

//   return endIndex;
// }
