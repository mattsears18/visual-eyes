export default function getName() {
  // return filename without file extension
  return this.name.replace(/\.[^/.]+$/, "");
}
