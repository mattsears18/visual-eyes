import helpers from '../../../lib/helpers';

export default function getVideoTime() {
  return helpers.millisecondsToHMSMS(this.timestamp);
}
