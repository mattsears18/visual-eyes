// export default function getRowVideoTime(opts) {
//   const { stimulusRow } = opts || {};
//   const { videoRows } = opts || {};

//   if (!stimulusRow) {
//     throw new Error('noStimulusRow');
//   }

//   if (!videoRows || !videoRows.length) {
//     throw new Error('noVideoRows');
//   }

//   // console.log(stimulusRow);
//   // console.log('======================================================');
//   // console.log(videoRows[0]);

//   const hrstart = process.hrtime();

//   const videoMatch = videoRows.find(
//     videoRow => videoRow['Index Binocular'] == stimulusRow['Index Binocular']
//       && videoRow['Pupil Size Right X [px]']
//         == stimulusRow['Pupil Size Right X [px]']
//       && videoRow['Pupil Size Right Y [px]']
//         == stimulusRow['Pupil Size Right Y [px]']
//       && videoRow['Pupil Diameter Right [mm]']
//         == stimulusRow['Pupil Diameter Right [mm]']
//       && videoRow['Pupil Size Left X [px]']
//         == stimulusRow['Pupil Size Left X [px]']
//       && videoRow['Pupil Size Left Y [px]']
//         == stimulusRow['Pupil Size Left Y [px]']
//       && videoRow['Pupil Diameter Left [mm]']
//         == stimulusRow['Pupil Diameter Left [mm]']
//       && videoRow['Gaze Vector Right X'] == stimulusRow['Gaze Vector Right X']
//       && videoRow['Gaze Vector Right Y'] == stimulusRow['Gaze Vector Right Y']
//       && videoRow['Gaze Vector Right Z'] == stimulusRow['Gaze Vector Right Z']
//       && videoRow['Gaze Vector Left X'] == stimulusRow['Gaze Vector Left X']
//       && videoRow['Gaze Vector Left Y'] == stimulusRow['Gaze Vector Left Y']
//       && videoRow['Gaze Vector Left Z'] == stimulusRow['Gaze Vector Left Z']
//       && videoRow['Eye Position Right X [mm]']
//         == stimulusRow['Eye Position Right X [mm]']
//       && videoRow['Eye Position Right Y [mm]']
//         == stimulusRow['Eye Position Right Y [mm]']
//       && videoRow['Eye Position Right Z [mm]']
//         == stimulusRow['Eye Position Right Z [mm]']
//       && videoRow['Eye Position Left X [mm]']
//         == stimulusRow['Eye Position Left X [mm]']
//       && videoRow['Eye Position Left Y [mm]']
//         == stimulusRow['Eye Position Left Y [mm]']
//       && videoRow['Eye Position Left Z [mm]']
//         == stimulusRow['Eye Position Left Z [mm]'],
//   );

//   const hrend = process.hrtime(hrstart);

//   console.info(
//     'Time to find match(hr): %ds %dms',
//     hrend[0],
//     hrend[1] / 1000000,
//   );

//   if (!videoMatch) {
//     throw new Error('noVideoMatch');
//   }

//   return videoMatch['Video Time [h:m:s:ms]'];
// }
