export default function velocity(which) {
  if(this.timeStep() > 0 && this.distance() > 0) {
    return (this.distance(which) / this.timeStep());
  } else {
    return 0;
  }
}
