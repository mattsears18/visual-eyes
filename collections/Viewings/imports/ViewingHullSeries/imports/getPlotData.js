export default function getPlotData() {
  let t0 = performance.now();

  let plotData = {
    layout: this.getLayout(),
    initialTraces: this.getTraces({
      initial: true,
      period: this.period,
      timestep: this.timestep,
      includeIncomplete: this.includeIncomplete,
      pointTrailLength: this.pointTrailLength,
    }),
    frames: this.getTraces({
      period: this.period,
      timestep: this.timestep,
      includeIncomplete: this.includeIncomplete,
      pointTrailLength: this.pointTrailLength,
    }),
  }

  console.log('Viewing.getPlotData() duration: ' + (performance.now() - t0) + ' ms')

  return plotData
}
