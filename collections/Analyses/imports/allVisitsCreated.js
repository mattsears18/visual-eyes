export default function allVisitsCreated() {
  return this.jobs({ type: 'analyses.makeVisits', status: { $ne: 'completed' } }).count() === 0;
}
