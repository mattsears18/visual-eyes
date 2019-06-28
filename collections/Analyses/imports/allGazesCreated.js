export default function allGazesCreated() {
  return this.jobs({ type: 'analyses.makeGazes', status: { $ne: 'completed' } }).count() == 0;
}
