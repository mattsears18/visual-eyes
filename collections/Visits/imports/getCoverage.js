export default function getCoverage() {
  const vhs = this.getHullseries({
    period: 999999999999999999,
    includeIncomplete: true,
  });
  return vhs.getFinalCoverage();
}
