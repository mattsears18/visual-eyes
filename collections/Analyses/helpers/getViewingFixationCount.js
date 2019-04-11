export default function getViewingFixationCount(gazepoints) {
  let indices = [];
  gazepoints.forEach(point => {
    if(point.fixationIndex) {
      if(!indices.includes(point.fixationIndex)) {
        indices.push(point.fixationIndex);
      }
    }
  });

  return indices.length;
}
