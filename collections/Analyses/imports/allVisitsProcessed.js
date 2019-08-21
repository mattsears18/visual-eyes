export default function allVisitsProcessed() {
  return this.jobs({ status: { $ne: 'completed' } }).count() === 0;
}
