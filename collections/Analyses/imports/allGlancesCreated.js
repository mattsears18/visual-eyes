export default function allGlancesCreated() {
  return this.jobs({ type: 'analyses.makeGlances', status: { $ne: 'completed' } }).count() === 0;
}
