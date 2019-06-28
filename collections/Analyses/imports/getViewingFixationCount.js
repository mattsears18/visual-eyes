export default function getGlanceFixationCount(gazepoints) {
  const indices = [];
  gazepoints.forEach((point) => {
    if (point.fixationIndex) {
      if (!indices.includes(point.fixationIndex)) {
        indices.push(point.fixationIndex);
      }
    }
  });

  return indices.length;
}
