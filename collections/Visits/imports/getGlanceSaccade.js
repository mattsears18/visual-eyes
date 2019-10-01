// export default function getGlanceSaccade() {
//   if (!this.fixationIndices || !this.fixationIndices.length) {
//     throw new Error('noFixationIndices');
//   }

//   if (this.firstFixationIndex()) {
//     const leadingSaccade = Eyeevents.findOne({
//       type: 'Saccade',
//       participantId: this.participantId,
//       combinedEventIndex: this.firstFixationIndex() - 1,
//     });

//     if (leadingSaccade) return leadingSaccade;
//   }

//   if (this.lastFixationIndex()) {
//     const trailingSaccade = Eyeevents.findOne({
//       type: 'Saccade',
//       participantId: this.participantId,
//       combinedEventIndex: this.lastFixationIndex() + 1,
//     });

//     if (trailingSaccade) return trailingSaccade;
//   }

//   return undefined;
// }
