export default function allViewingsProcessed() {
  return this.jobs({ 'status': { $ne: 'completed' }}).count() == 0;
}
