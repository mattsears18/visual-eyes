export default function allGlancesProcessed() {
  return this.jobs({ status: { $ne: 'completed' } }).count() === 0;
}
