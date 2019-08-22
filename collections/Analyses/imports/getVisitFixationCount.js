export default function getVisitFixationCount(gazepoints) {
  const indices = [];
  gazepoints.forEach((point) => {
    if (point.eventIndex) {
      if (!indices.includes(point.eventIndex)) {
        indices.push(point.eventIndex);
      }
    }
  });

  return indices.length;
}
