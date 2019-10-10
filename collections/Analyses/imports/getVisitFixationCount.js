export default function getVisitFixationCount(gazepoints) {
  const indices = [];
  gazepoints.forEach((point) => {
    if (point.originalEventIndex) {
      if (!indices.includes(point.originalEventIndex)) {
        indices.push(point.originalEventIndex);
      }
    }
  });

  return indices.length;
}
