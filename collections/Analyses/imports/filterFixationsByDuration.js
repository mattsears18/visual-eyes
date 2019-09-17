export default function filterFixationsByDuration(fixations, duration) {
  if (!fixations || !fixations.length) {
    throw new Error('noFixations');
  }

  if (!duration) return fixations;

  return fixations.filter(fixation => fixation.duration >= duration);
}
