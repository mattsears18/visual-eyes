export default function allViewingsCreated() {
  return this.jobs({ 'type': 'analyses.makeViewings', 'status': { $ne: 'completed' }}).count() == 0;
}
