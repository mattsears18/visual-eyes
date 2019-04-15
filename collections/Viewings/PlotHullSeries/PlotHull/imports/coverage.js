export default function coverage({
  points = helpers.distinctPoints(this.polygon({})),
}) {
  return this.area({ points: points }) / this.viewing().stimulus().area();
}
