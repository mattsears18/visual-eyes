export default function filterFixationsByDuration(eyeevents, duration) {
  if (!eyeevents || !eyeevents.length) {
    throw new Error('noFixations');
  }

  if (!duration) return eyeevents;

  return eyeevents.filter(
    eyeevent => eyeevent.type === 'Fixation' && eyeevent.duration >= duration,
  );
}
