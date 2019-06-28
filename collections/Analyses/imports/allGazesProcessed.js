export default function allGazesProcessed() {
  return this.jobs({ status: { $ne: 'completed' } }).count() == 0;
}
