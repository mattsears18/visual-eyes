// getLastPointTrailTrace({
//   initial = false,
// }) {
//   let name;
//
//   if(this.viewing().study().fixationsOnly) {
//     name = 'Last ' + this.pointTrailLength + ' Fixations';
//   } else {
//     name = 'Last ' + this.pointTrailLength + ' Gaze Points';
//   }
//
//   if(initial) {
//     return {
//       name: name,
//       x: this.pointTrail(this.pointTrailLength, 'x'),
//       y: this.pointTrail(this.pointTrailLength, 'y'),
//       mode: 'lines',
//       type: 'scatter',
//       line: {
//         color: '#63a70a',
//         width: 2.5,
//       },
//     }
//   } else {
//     return {
//       x: this.pointTrail(this.pointTrailLength, 'x'),
//       y: this.pointTrail(this.pointTrailLength, 'y'),
//     };
//   }
// }
